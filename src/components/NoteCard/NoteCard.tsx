import { Note } from '@/types/NoteType'
import { FC } from 'react'
import { Badge, Card, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import styles from './NoteCard.module.scss'

type Props = {
  note: Note
}

const NoteCard: FC<Props> = ({ note }) => {
  const { id, title, tags } = note

  return (
    <Card
      as={Link}
      to={`/${id}`}
      className={`h-100 text-reset text-decoration-none ${styles.card}`}
    >
      <Card.Body>
        <Stack
          gap={2}
          className="align-items-center justify-content-center h-100"
        >
          <h3 className="fs-5">{title}</h3>

          {!!tags.length && (
            <Stack
              gap={1}
              direction="horizontal"
              className="justify-content-center flex-wrap"
            >
              {tags.map((tag) => (
                <Badge key={tag.id} className="text-truncate">
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  )
}

export default NoteCard
