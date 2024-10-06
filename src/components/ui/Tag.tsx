import {ReactNode} from "react";
import {motion} from "framer-motion";

const Tag = ({ children, id, onRemove }: { children: ReactNode, id: string, onRemove: (id: string) => void }) => {

  return (
    <motion.span
          initial={{
            opacity: 0,
            x: 20
          }}
          animate={{
            opacity: 1,
            x: 0
          }}
          className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium rounded bg-gray-700 text-gray-300">
      {children}
      <button type="button"
              onClick={() => onRemove(id)}
              className="inline-flex items-center p-1 ms-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-800 hover:text-blue-300"
                data-dismiss-target="#badge-dismiss-default" aria-label="Remove">
        <svg className="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
        <span className="sr-only" >Remove badge</span>
      </button>
     </motion.span>
  )
}

export default Tag