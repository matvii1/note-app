import NotesList from '@/components/NotesList'
import { useNoteContext } from '@/context/NoteProvider'
import { useReactSelect } from '@/hooks/useReactSelect'
import { SingeSelectTag } from '@/types/ReactSelectTagType'
import { convertToReactSelect } from '@/utils/convertToReactSelect'
import { getFilteredNotes } from '@/utils/getFilteredNotes'
import { ChangeEvent, FC, useMemo, useState } from 'react'
import { Button, Col, Form, Row, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ReactSelect from 'react-select'

const NotePage: FC = () => {
  const { selectedTags, setSelectedTags } = useReactSelect([])
  const [title, setTitle] = useState('')

  const { notes, availableTags } = useNoteContext()

  function handleSelectChange(tag: SingeSelectTag) {
    if (tag) {
      const convertedTag = {
        id: tag.value,
        label: tag.label,
      }

      setSelectedTags((prev) => [...prev, convertedTag])
    }
  }

  function handleTitleChange(event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value)
  }

  const filteredNotes = useMemo(() => {
    return getFilteredNotes({ title, selectedTags, notes })
  }, [title, selectedTags, notes])

  return (
    <>
      <Row className="justify-content-between align-items-center mt-4">
        <Col xs="auto">
          <h1>Notes</h1>
        </Col>
        <Col xs="auto">
          <Stack direction="horizontal" gap={2}>
            <Link to="/new">
              <Button variant="primary">Create note</Button>
            </Link>
          </Stack>
        </Col>
      </Row>

      <Form className="my-4">
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={handleTitleChange}
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="title">
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                options={convertToReactSelect(availableTags)}
                value={convertToReactSelect(selectedTags)}
                onChange={handleSelectChange}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>

      <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        <NotesList filteredNotes={filteredNotes} />
      </Row>
    </>
  )
}

export default NotePage
