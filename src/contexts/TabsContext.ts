import {createContext} from "react";

interface TabsContextType {
  setActiveTab: (key: string) => void;
  activeTab: string;
}

const TabsContext = createContext<TabsContextType>({
  activeTab: '1',
  setActiveTab: () => {}
})

export default TabsContext
