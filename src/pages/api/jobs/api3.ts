import {NextApiRequest, NextApiResponse} from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{
    message: string,
    error?: boolean,
  }>
) {

  // Simulate a quick response (within timeout)

  setTimeout(() => {
    res.status(400).json({
      message: "OOps, data is not available",
      error: true
    })
  }, 2000)
}
