import { NoteData } from './NoteDataType'
import { Note } from './NoteType'
import { Tag } from './TagType'

export type NoteContextType = {
  notes: Note[]
  onAddTag: (tag: Tag) => void
  onCreateNote: (data: NoteData) => void
  onUpdateNote: (id: string, data: NoteData) => void
  onDeleteNote: (id: string) => void
  availableTags: Tag[]
}
