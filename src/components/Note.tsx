import { useNote } from '@/hooks/useNote'
import { FC } from 'react'
import { Badge, Button, Col, Row, Stack } from 'react-bootstrap'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { Link, useNavigate } from 'react-router-dom'

type Props = {
  onDelete: (id: string) => void
}

const Note: FC<Props> = ({ onDelete }) => {
  const { tags, id, markdown } = useNote()
  const navigate = useNavigate()

  return (
    <>
      <Row className="align-align-items-center my-4">
        <Col>
          <h1>title</h1>

          {!!tags.length && (
            <Stack gap={1} direction="horizontal" className="flex-wrap">
              {tags.map((tag) => (
                <Badge key={tag.id} className="text-truncate">
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to={`/${id}/edit`}>
              <Button variant="primary">Edit</Button>
            </Link>

            <Button
              variant="outline-danger"
              onClick={() => {
                onDelete(id)
                navigate('/')
              }}
            >
              Delete
            </Button>

            <Link to="/">
              <Button variant="outline-secondary">Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </>
  )
}

export default Note
