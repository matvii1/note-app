import NewForm from '@/components/NewForm'
import { NoteData } from '@/types/NoteDataType'
import { Tag } from '@/types/TagType'

import { FC } from 'react'

type Props = {
  onSubmit: (data: NoteData) => void
  onAddTag: (ta: Tag) => void
  availableTags: Tag[]
}

const NewNote: FC<Props> = ({ onSubmit, onAddTag, availableTags }) => {
  return (
    <>
      <h1 className="my-4">New note</h1>

      <NewForm
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  )
}

export default NewNote
