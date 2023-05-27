import { Tag } from '@/types/TagType'

export function convertToReactSelect(tags: Tag[]) {
  return tags.map((tag) => ({
    label: tag.label,
    value: tag.id,
  }))
}
