import {createContext} from "react";
import {Job, QueryParams} from "../utility/types";

interface MainContextType {
  handleResetQueryParams: () => void;
  setQueryParams: (queryParams: QueryParams) => void;
  queryParams: QueryParams;
  isLoading: boolean;
  data: {
    jobs: Job[],
    total: number,
  };
}

const MainContext = createContext<MainContextType>({
  handleResetQueryParams: () => {},
  setQueryParams: () => {},
  isLoading: false,
  data: {
    jobs: [],
    total: 0,
  },
  queryParams: {}
})

export default MainContext
