import axios from "axios";
import { useEffect, useState } from "react";

/**
 *  This is hardcoded due to the way vite environment variables are handled. 
 *  See {@link https://github.com/vitejs/vite/issues/10059 | this} issue for more info
 */
const baseUrl = "http://localhost:3000";

export default function useResource<T>(endpoint: string) {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get<T>(baseUrl + endpoint)
      .then(({ data }) => setData(data))
      .catch((e) => setError(e))
      .finally(() => setIsLoading(false));
  }, [endpoint]);

  return {
    data,
    isLoading,
    error,
  };
}
