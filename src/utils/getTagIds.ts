import { Tag } from '@/types/TagType'

export function getTagIds(tags: Tag[]) {
  return tags.map((tag) => tag.id)
}
