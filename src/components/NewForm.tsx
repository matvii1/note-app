import { useNoteContext } from '@/context/NoteProvider'
import { useReactSelect } from '@/hooks/useReactSelect'
import { NoteData } from '@/types/NoteDataType'
import { convertToReactSelect } from '@/utils/convertToReactSelect'
import { FC, FormEvent, useMemo, useRef } from 'react'
import { Button, Col, Form, Row, Stack } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import CreatableReactSelect from 'react-select/creatable'
import { v4 as uuidV4 } from 'uuid'

type Props = {
  onSubmit: (data: NoteData) => void
} & Partial<NoteData>

const NewForm: FC<Props> = ({
  title = '',
  markdown = '',
  tags = [],
  onSubmit,
}) => {
  const { onAddTag, availableTags } = useNoteContext()
  const { handleReactSelectChange, selectedTags, setSelectedTags } =
    useReactSelect(tags)

  const navigate = useNavigate()

  const titleRef = useRef<HTMLInputElement>(null)
  const markdownRef = useRef<HTMLTextAreaElement>(null)

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    onSubmit({
      title: titleRef.current?.value || '',
      markdown: markdownRef.current?.value || '',
      tags: selectedTags,
    })

    navigate('..')
  }

  function onCreateSelect(label: string) {
    const newTag = { id: uuidV4(), label }

    onAddTag(newTag)
    setSelectedTags((prevTags) => [...prevTags, newTag])
  }

  const reactSelectOptions = useMemo(() => {
    return convertToReactSelect(availableTags)
  }, [availableTags])

  return (
    <Form onSubmit={handleSubmit}>
      <Stack direction="vertical" gap={2}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control ref={titleRef} required defaultValue={title} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <CreatableReactSelect
                isMulti={true}
                value={convertToReactSelect(selectedTags)}
                onChange={handleReactSelectChange}
                onCreateOption={onCreateSelect}
                options={reactSelectOptions}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="markdown">
          <Form.Label>Body</Form.Label>
          <Form.Control
            as="textarea"
            defaultValue={markdown}
            ref={markdownRef}
            required
            rows={10}
          />
        </Form.Group>

        <Stack
          direction="horizontal"
          gap={2}
          className="mt-2 justify-content-end"
        >
          <Button type="submit" variant="primary">
            Submit
          </Button>
          <Link to="..">
            <Button type="button" variant="outline-secondary">
              Cancel
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  )
}

export default NewForm
