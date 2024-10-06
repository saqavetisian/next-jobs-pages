import {memo} from "react";
import Skeleton from "../ui/Skeleton";

const Loading = () => {

  return (
    <>
      {[1,2,3,4].map((item) => (
        <Skeleton key={item} />
      ))}
    </>
  )
}

export default memo(Loading)