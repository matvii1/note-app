import NoteCard from '@/components/NoteCard/NoteCard'
import { Note } from '@/types/NoteType'
import { FC } from 'react'
import { Col } from 'react-bootstrap'

type Props = {
  filteredNotes: Note[]
}

const NotesList: FC<Props> = ({ filteredNotes }) => {
  return (
    <>
      {filteredNotes.map((note) => {
        return (
          <Col key={note.id}>
            <NoteCard note={note} />
          </Col>
        )
      })}
    </>
  )
}

export default NotesList
