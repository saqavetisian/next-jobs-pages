import React, {memo, useCallback, useContext, useState} from "react";
import TagList from "@/components/ui/TagList";
import Drawer from "@/components/ui/Drawer";
import Form from "@/components/ui/Form";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import MainContext from "@/contexts/MainContext";
import {TagType} from "@/utility/types";

const SelectedFilters = () => {

  const { setQueryParams } = useContext(MainContext)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [tags, setTags] = useState<TagType[]>([])

  const handleOpenFilterToggle = useCallback(() => {
    setIsDrawerOpen((prevState) => !prevState)
  }, [])

  const handleSubmit = useCallback((values: object) => {
    const structuredTags: TagType[] = Object.entries(values).map(([key, value]) => ({key, value})).filter(({ value }) => value);
    setTags(structuredTags)
    setIsDrawerOpen(false)
    setQueryParams({
      ...values,
      page: 1
    })
  }, [])

  const onRemove = useCallback((tags: TagType[], key: string) => {
    setTags(tags)
    setQueryParams({
      [key]: '',
      page: 1
    })
  }, [])

  return (
    <div className="flex gap-4 items-center">
      <div>
        <button className="bg-white text-xs hover:bg-gray-100 text-gray-800 font-semibold p-2 border border-gray-400
          rounded shadow"
                onClick={handleOpenFilterToggle}>
          filter
        </button>
      </div>
      <TagList tags={tags} onRemove={onRemove} />
      <Drawer open={isDrawerOpen} setOpen={setIsDrawerOpen}>
        <div className="w-[400px]">
          <h2 className="text-center font-semibold mb-4 text-xl">
            Advanced filter
          </h2>

          <Form onSubmit={handleSubmit}>
            <Input name="company" label="Company" />
            <div>
              <Input name="salary" label="Salary" type="number" />
              <p className="text-xs text-gray-300">
                Average salary between 60k - 160k
              </p>
            </div>
            <Input name="postedAt" label="Posted at" type="date" />
            <div className="fixed bottom-4 flex justify-center left-1/2 -translate-x-1/2	">
              <Button type="submit">
                apply
              </Button>
            </div>
          </Form>
        </div>
      </Drawer>
    </div>
  )
}

export default memo(SelectedFilters)