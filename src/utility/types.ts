export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salary?: string;
  postedDate: string;
  applicationUrl: string;
}

export type TagType = {
  key: string;
  value: string;
}

export type QueryParams = {
  page?: string | number;
  company?: string;
  location?: string;
  postedAt?: string;
  position?: string;
  salary?: string;
}