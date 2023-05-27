import NewForm from '@/components/NewForm'
import { useNote } from '@/hooks/useNote'
import { NoteData } from '@/types/NoteDataType'
import { Tag } from '@/types/TagType'

import { FC } from 'react'

type Props = {
  onSubmit: (id: string, data: NoteData) => void
  onAddTag: (ta: Tag) => void
  availableTags: Tag[]
}

const EditNote: FC<Props> = ({ onSubmit, onAddTag, availableTags }) => {
  const { id, markdown, title, tags } = useNote()

  return (
    <>
      <h1 className="my-4">Edit note</h1>

      <NewForm
        markdown={markdown}
        title={title}
        tags={tags}
        onSubmit={(data) => onSubmit(id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  )
}

export default EditNote
