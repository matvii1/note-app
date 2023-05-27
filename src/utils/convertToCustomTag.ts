import { ReactSelectTag } from '@/types/ReactSelectTagType'
import { Tag } from '@/types/TagType'
import { MultiValue } from 'react-select'

export function convertToCustomTag(tags: MultiValue<ReactSelectTag>): Tag[] {
  return tags.map((tag) => ({
    label: tag.label,
    id: tag.value,
  }))
}
