import React, {useContext} from 'react';
import Button from "@/components/ui/Button";
import MainContext from "@/contexts/MainContext";

const Empty: React.FC = () => {

  const { handleResetQueryParams } = useContext(MainContext)

  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-16 h-16 text-gray-400 mx-auto mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 12H8m0 0l-2-2m2 2l-2 2m2-2h8m-8 0l2 2m-2-2l2-2"
          />
        </svg>
        <h2 className="text-2xl font-semibold text-gray-700">No Data Found</h2>
        <p className="text-gray-500 mt-2">Try adjusting your search or filter.</p>
        <Button onClick={handleResetQueryParams}>
          Refresh
        </Button>
      </div>
    </div>
  );
};

export default Empty;
