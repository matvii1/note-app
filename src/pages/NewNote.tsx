import NewForm from '@/components/NewForm'
import { useNoteContext } from '@/context/NoteProvider'

import { FC } from 'react'

type Props = {}

const NewNote: FC<Props> = () => {
  const { onCreateNote } = useNoteContext()

  return (
    <>
      <h1 className="my-4">New note</h1>

      <NewForm onSubmit={onCreateNote} />
    </>
  )
}

export default NewNote
