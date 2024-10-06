import {NextApiRequest, NextApiResponse} from "next";
import {Job} from "@/utility/types";
import {mockJobs1} from "@/utility/utils";
import {QueryParams} from "../../../utility/types";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{
    jobs: Job[],
    total: number
  }>
) {
  const { page = 1, company = '', location = '', postedAt = '', position = '', salary = '' }: QueryParams = req.query

  const jobTitleFilter = position?.toLowerCase();
  const locationFilter = location?.toLowerCase();
  const companyFilter = company?.toLowerCase();

  const data = mockJobs1.filter((job: Job) => {
    // Check if each filter criterion matches the corresponding job property
    const matchesJobTitle = !jobTitleFilter || job.title.toLowerCase().includes(jobTitleFilter);
    const matchesLocation = !locationFilter || job.location.toLowerCase().includes(locationFilter);
    const matchesCompany = !companyFilter || job.company.toLowerCase().includes(companyFilter);
    const matchesPostedAt = !postedAt || job.postedDate === postedAt;
    // Parse salary string and extract min and max salary values
    const jobSalaryRange = job.salary ? job.salary.replace(/[\$,]/g, '').split('-').map(Number) : null;
    const salaryMin = Number(salary);  // Provided salary filter (e.g., '90000')

    const matchesSalary = !salaryMin || (
      jobSalaryRange &&
      jobSalaryRange[0] <= salaryMin &&  // Check if job min salary is <= filter value
      jobSalaryRange[1] >= salaryMin     // Check if job max salary is >= filter value
    );

    // Return true only if all active filters match
    return matchesJobTitle && matchesLocation && matchesCompany && matchesSalary && matchesPostedAt
  });

  const paginatedJobs = data.slice(0, Number(page) * 5); // Slice the jobs for the current page

  // Simulate a quick response (within timeout)
  setTimeout(() => {
    res.status(200).json({
      jobs: paginatedJobs,
      total: data.length
    })
  }, 1000)
}
