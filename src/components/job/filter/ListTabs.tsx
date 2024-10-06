import React, {memo, useCallback, useContext} from "react";
import Tabs from "@/components/ui/Tabs";
import TabsContext from "@/contexts/TabsContext";

const SelectedFilters = () => {
  const { setActiveTab, activeTab } = useContext(TabsContext)

  // FUnction will handle tabs change All/Bookmarked
  const handleCurrentTab = useCallback((tab: string) => {
    setActiveTab(tab)
  }, [])

  return (
    <div>
      <Tabs onClick={handleCurrentTab} current={activeTab} tabs={[{ label: 'All', key: '1' },{ label: 'Bookmarked', key: '2' }]} />
    </div>
  )
}

export default memo(SelectedFilters)