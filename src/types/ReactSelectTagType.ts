import { MultiValue, SingleValue } from 'react-select'

export type ReactSelectTag = {
  value: string
  label: string
}

export type MultiSelectTag = MultiValue<ReactSelectTag>
export type SingeSelectTag = SingleValue<ReactSelectTag>
