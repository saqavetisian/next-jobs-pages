import React from "react";
import MainInputs from "./filter/MainInputs";
import SelectedFilters from "./filter/SelectedFilters";
import ListTabs from "./filter/ListTabs";

const Filter = () => {

  return (
    <div className="sticky top-0 bg-white z-10 relative w-full max-w-4xl mx-auto h-full px-6">
      <MainInputs/>
      <SelectedFilters/>
      <ListTabs/>
    </div>
  )
}

export default Filter