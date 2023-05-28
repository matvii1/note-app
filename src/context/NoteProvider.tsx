import { useLocalStorage } from '@/hooks/useLocalStorage'
import { NoteContextType } from '@/types/NoteContextType'
import { NoteData } from '@/types/NoteDataType'
import { RawNote } from '@/types/RawNoteType'
import { Tag } from '@/types/TagType'
import { getTagIds } from '@/utils/getTagIds'
import { FC, createContext, useContext, useMemo } from 'react'
import { ReactNode } from 'react-markdown/lib/ast-to-react'
import { v4 as uuidV4 } from 'uuid'

type Props = {
  children: ReactNode
}

export const NoteContext = createContext<NoteContextType>({} as NoteContextType)

export const useNoteContext = () => useContext(NoteContext)

const NoteProvider: FC<Props> = ({ children }) => {
  const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', [])
  const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', [])

  const notesWithTags = useMemo(() => {
    return notes.map((note) => ({
      ...note,
      tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
    }))
  }, [notes, tags])

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes((prevNotes) => [
      ...prevNotes,
      { ...data, id: uuidV4(), tagIds: getTagIds(tags) },
    ])
  }

  function onUpdateNote(id: string, { tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return prevNotes.map((prevNote) => {
        if (prevNote.id === id) {
          return {
            ...prevNote,
            ...data,
            tagIds: getTagIds(tags),
          }
        } else {
          return prevNote
        }
      })
    })
  }

  function onAddTag(tag: Tag) {
    setTags((prev) => [...prev, tag])
  }

  function onDeleteNote(id: string) {
    setNotes((prevNotes) => {
      return prevNotes.filter((prevNote) => prevNote.id !== id)
    })
  }

  const contextValue = {
    notes: notesWithTags,
    onAddTag,
    onCreateNote,
    onUpdateNote,
    onDeleteNote,
    availableTags: tags,
  }

  return (
    <NoteContext.Provider value={contextValue}>{children}</NoteContext.Provider>
  )
}

export default NoteProvider
