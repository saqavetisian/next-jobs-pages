import {motion} from "framer-motion";
import Divider from "@/components/ui/Divider";
import {Job} from "@/utility/types";
import {memo} from "react";

const Card = ({
                job,
                isBookmarked,
                handleBookmarkToggle
              }: { job: Job, isBookmarked?: boolean, handleBookmarkToggle: (jobId: string) => void }) => {

  return (
    <motion.div
      initial={{
        y: 100,
      }}
      whileInView={{
        y: 0,
      }}
      transition={{
        duration: 0.8
      }}
      viewport={{once: true}}
      className="space-y-2.5 border rounded-lg p-4 w-full"
    >
      <p className="text-gray-400 text-sm">
        {job.company} / {job.location}
      </p>
      <h3 className="font-semibold text-xl text-skyblue-500">
        {job.title}
      </h3>
      <p className="text-green-500 text-sm">
        {job.salary}
      </p>
      <Divider/>
      <p className="text-sm text-gray-500">
        {job.description}
      </p>
      <button className="text-xs font-semibold flex items-center hover:opacity-50 save-button"
              onClick={() => handleBookmarkToggle(job.id)}>
        {isBookmarked ? (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="24px" fill="#2e2e2e">
              <path d="M0 0h24v24H0V0z" fill="none"/>
              <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
            </svg>
            remove
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
              <path fill="#000"
                    d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 200-86 200 86v-518H280v518Zm0-518h400-400Z"/>
            </svg>
            save
          </>
        )}
      </button>
    </motion.div>
  )
}

export default memo(Card)