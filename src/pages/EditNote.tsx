import NewForm from '@/components/NewForm'
import { useNoteContext } from '@/context/NoteProvider'
import { useNote } from '@/hooks/useNote'

import { FC } from 'react'

const EditNote: FC = () => {
  const { onUpdateNote } = useNoteContext()
  const { id, markdown, title, tags } = useNote()

  return (
    <>
      <h1 className="my-4">Edit note</h1>

      <NewForm
        markdown={markdown}
        title={title}
        tags={tags}
        onSubmit={(data) => onUpdateNote(id, data)}
      />
    </>
  )
}

export default EditNote
