import { useState } from "react";

const useFetch = <T,>(endpoint: string) => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (queryParams?: URLSearchParams) => {
    try {
      setIsLoading(true);
      const url = queryParams ? `${endpoint}?${queryParams}` : endpoint;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch data');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, setData, isLoading, fetchData };
};

export default useFetch;