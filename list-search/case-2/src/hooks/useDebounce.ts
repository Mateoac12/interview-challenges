import {useEffect, useState} from "react";

export const useDebounce = (query: string = "", timer: number = 300) => {
  const [debouncedQuery, setDebouncedQuery] = useState<string>(query);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebouncedQuery(query);
    }, timer);

    return () => clearTimeout(debounceTimer);
  }, [query, timer]);

  return debouncedQuery;
};
