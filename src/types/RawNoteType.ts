export type RawNoteData = {
  title: string
  markdown: string
  tagIds: string[]
}

export type RawNote = {
  id: string
} & RawNoteData

