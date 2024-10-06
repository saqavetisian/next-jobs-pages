import Tag from "./Tag";
import {memo} from "react";
import {TagType} from "@/utility/types";

const TagList = ({ tags = [], onRemove }: { tags: TagType[], onRemove: (tags: TagType[], key: string) => void }) => {

  const handleRemove = (key: string) => {
    const filteredTags = tags.filter((tag) => tag.key !== key)
    onRemove(filteredTags, key)
  }

  return (
   <div className="flex gap-1 items-center">
     { tags.length > 0 ? tags.map(({key, value}) => (
       <Tag key={key} id={key} onRemove={handleRemove}>
         {value}
       </Tag>
     )) : (
       <div className="text-xs text-gray-400">
         No filter selected
       </div>
     ) }
   </div>
  )
}

export default memo(TagList)