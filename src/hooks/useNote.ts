import { Note } from '@/types/NoteType'
import { useOutletContext } from 'react-router-dom'

export function useNote() {
  return useOutletContext<Note>()
}
