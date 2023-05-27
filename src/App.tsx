import { useLocalStorage } from '@/hooks/useLocalStorage'
import NoteLayout from '@/layouts/NoteLayout'
import NewNote from '@/pages/NewNote'
import NotePage from '@/pages/NotesPage'
import { NoteData } from '@/types/NoteDataType'
import { RawNote } from '@/types/RawNoteType'
import { Tag } from '@/types/TagType'
import { getTagIds } from '@/utils/getTagIds'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FC, useMemo } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { v4 as uuidV4 } from 'uuid'
import Note from './components/Note'
import EditNote from './pages/EditNote'

const App: FC = () => {
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

  return (
    <div className="container my-20">
      <Routes>
        <Route
          path="/"
          element={<NotePage availableTags={tags} notes={notesWithTags} />}
        />
        <Route
          path="/new"
          element={
            <NewNote
              onSubmit={onCreateNote}
              onAddTag={onAddTag}
              availableTags={tags}
            />
          }
        />
        <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
          <Route index element={<Note onDelete={onDeleteNote} />} />
          <Route
            path="edit"
            element={
              <EditNote
                onSubmit={onUpdateNote}
                onAddTag={onAddTag}
                availableTags={tags}
              />
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default App
