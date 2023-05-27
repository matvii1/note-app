import { MultiSelectTag } from '@/types/ReactSelectTagType'
import { Tag } from '@/types/TagType'
import { convertToCustomTag } from '@/utils/convertToCustomTag'
import { useCallback, useState } from 'react'

export function useReactSelect(defaultTags: Tag[]) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>(defaultTags)

  const handleReactSelectChange = useCallback((tags: MultiSelectTag) => {
    setSelectedTags(convertToCustomTag(tags))
  }, [])

  return {
    selectedTags,
    setSelectedTags,
    handleReactSelectChange,
  }
}
