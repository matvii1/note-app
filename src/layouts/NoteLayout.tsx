import { Note } from '@/types/NoteType'
import { FC } from 'react'
import { Navigate, Outlet, useParams } from 'react-router-dom'

type Props = {
  notes: Note[]
}

const NoteLayout: FC<Props> = ({ notes }) => {
  const { id } = useParams()
  const note = notes.find((note) => note.id === id)

  if (!note) {
    return <Navigate to="/" replace />
  }

  return <Outlet context={note} />
}

export default NoteLayout
