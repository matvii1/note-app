import { Note } from '@/types/NoteType'
import { Tag } from '@/types/TagType'
import { lower } from './lower'

type Data = {
  title: string
  selectedTags: Tag[]
  notes: Note[]
}

export function getFilteredNotes({ title, selectedTags, notes }: Data) {
  return notes.filter((note) => {
    const isTitleEmpty = title === ''
    const isNoteHasTitle = lower(note.title).includes(lower(title))

    const isTagsEmpty = selectedTags.length === 0
    const isNoteHasTag = selectedTags.every((selectedTag) => {
      return note.tags.some((noteTag) => noteTag.id === selectedTag.id)
    })

    return (isTitleEmpty || isNoteHasTitle) && (isTagsEmpty || isNoteHasTag)
  })
}
