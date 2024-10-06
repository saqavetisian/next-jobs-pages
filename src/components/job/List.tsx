import {useCallback, useContext, useMemo, useRef, useState} from 'react'
import Loading from "./Loading";
import Empty from "./Empty";
import Card from "./Card";
import Button from "@/components/ui/Button";
import TracingBeam from "@/components/ui/TracingBeam";
import TabsContext from "@/contexts/TabsContext";
import MainContext from "@/contexts/MainContext";

const List = () => {
  const {isLoading, data, setQueryParams} = useContext(MainContext)
  const {activeTab} = useContext(TabsContext)
  const page = useRef<number>(1)
  const [bookmarked, setBookmarked] = useState<string[]>([])

  const handleLoadMore = useCallback(() => {
    page.current = page.current + 1
    setQueryParams({page: page.current})
  }, [])

  const handleBookmarkToggle = useCallback((bookmarkId: string) => {
    setBookmarked((prevState: string[]) => {
      if (prevState.includes(bookmarkId)) {
        return prevState.filter((favourite) => favourite !== bookmarkId)
      } else {
        return [...prevState, bookmarkId]
      }
    })
  }, [])

  const tabData = useMemo(() => {
    if (activeTab === '1') {
      return data?.jobs
    }

    return data.jobs.filter((job) => bookmarked.includes(job.id))
  }, [data, bookmarked, activeTab])

  return (
    <TracingBeam className="px-6" key={tabData?.length}>

      <p className="text-sm text-gray-400">
      { isLoading ? (
        <>
          loading ...
        </>
      ) : data?.jobs?.length && activeTab === '1' ? (
         <>
           loaded <strong>{data?.jobs?.length}</strong> jobs of <strong>{data?.total}</strong>
         </>
      ) : activeTab === '2' ? (
        <>
          bookmarked <strong>{tabData?.length}</strong> jobs
        </>
      ) : null }
      </p>

      <div className="flex flex-col gap-4 overflow-hidden">

        {isLoading ? <Loading/> : tabData.length === 0 ? <Empty/> : (
          tabData.map((job) => (
            <Card isBookmarked={bookmarked.includes(job.id)} key={job.id} job={job}
                  handleBookmarkToggle={handleBookmarkToggle}/>
          ))
        )}


        {data?.total > data?.jobs?.length && activeTab === '1' && (
          <Button onClick={handleLoadMore}>
            load more
          </Button>
        )}
      </div>
    </TracingBeam>
  )
}

export default List