import { useNoteContext } from '@/context/NoteProvider'
import { FC } from 'react'
import { Navigate, Outlet, useParams } from 'react-router-dom'

const NoteLayout: FC = () => {
  const { notes } = useNoteContext()
  const { id } = useParams()
  const note = notes.find((note) => note.id === id)

  if (!note) {
    return <Navigate to="/" replace />
  }

  return <Outlet context={note} />
}

export default NoteLayout
