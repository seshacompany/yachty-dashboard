import { api } from "@/lib/axios";

export type FilterProperties = {
  areas: string[];
  jobTitles: string[];
  performanceScores: number[];
  statuses: string[];
};

export const getFilterProperties = async (): Promise<FilterProperties> => {
  const { data: result } = await api.get("/staff/filter-properties");
  return {
    areas: result.data?.areas ?? [],
    jobTitles: result.data?.jobTitles ?? [],
    performanceScores: result.data?.performanceScores ?? [],
    statuses: result.data?.statuses ?? [],
  };
};
