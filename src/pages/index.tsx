import React, {useCallback, useEffect, useMemo, useState} from "react";
import {Inter} from "next/font/google";
import useSWR from "swr";
import MainContext from "@/contexts/MainContext";
import Filter from "@/components/job/Filter";
import List from "@/components/job/List";
import fetcher from "@/utility/fetcher";
import convertQueryParams from "@/utility/convertQueryParams";
import TabsContext from "@/contexts/TabsContext";
import {toast, ToastContainer} from "react-toastify";
import {QueryParams} from "../utility/types";

const inter = Inter({subsets: ["latin"]});

export default function Home() {
  const [queryParams, setQueryParams] = useState<QueryParams>({})
  const [activeTab, setActiveTab] = useState('1')

  const {data, error, isLoading} = useSWR(`/api/jobs/api2${convertQueryParams(queryParams)}`, fetcher)
  const {data: api2Data, error: api1Error, isLoading: api1Loading} = useSWR(`/api/jobs/api1${convertQueryParams(queryParams)}`, fetcher)
  const {data: api3Data, isLoading: api2Loading} = useSWR(`/api/jobs/api3`, fetcher)


  useEffect(() => {
    if (api3Data?.error) {
      toast.error(api3Data.message)
    }
  }, [api3Data])

  const handleQueryParams = useCallback((newState: QueryParams) => {
    setQueryParams((prevState) => ({...prevState, ...newState}))
  }, [])

  const handleResetQueryParams = useCallback(() => {
    setQueryParams({})
  }, [])

  const loadedData = useMemo(() => {
    const dataTotal = data?.total || 0
    const api2DataTotal = api2Data?.total || 0
    const dataJobs = data?.jobs || []
    const api2DataJobs = api2Data?.jobs || []

    return {
      total: api2DataTotal + dataTotal,
      jobs: [...dataJobs, ...api2DataJobs],
    }
  }, [data, api2Data])

  return (
    <main
      className={`${inter.className} flex-1`}
    >
      <h1 className="text-center text-2xl text-bold mb-4">
        Job search aggregator
      </h1>
      <MainContext.Provider value={{
        data: loadedData,
        isLoading: isLoading || api1Loading || api2Loading,
        setQueryParams: handleQueryParams,
        queryParams,
        handleResetQueryParams,
      }}>
        <TabsContext.Provider value={{
          activeTab,
          setActiveTab,
        }}>

          <div className="flex flex-col gap-10">
            <Filter />
            { !error && !api1Error ? <List /> : null }
          </div>
        </TabsContext.Provider>
      </MainContext.Provider>
      <ToastContainer />
    </main>
  );
}
