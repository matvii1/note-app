import Note from '@/components/Note'
import NoteLayout from '@/layouts/NoteLayout'
import EditNote from '@/pages/EditNote'
import NewNote from '@/pages/NewNote'
import NotePage from '@/pages/NotesPage'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FC } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const App: FC = () => {
  return (
    <div className="container my-20">
      <Routes>
        <Route path="/" element={<NotePage />} />
        <Route path="/new" element={<NewNote />} />
        <Route path="/:id" element={<NoteLayout />}>
          <Route index element={<Note />} />
          <Route path="edit" element={<EditNote />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default App
