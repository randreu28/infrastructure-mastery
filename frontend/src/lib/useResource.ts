import axios from "axios";
import { useEffect, useState } from "react";

if (!import.meta.env.VITE_API_URL) {
  throw Error("Enviroment variables missing");
}

const baseUrl: string = import.meta.env.VITE_API_URL;

export default function useResource<T>(endpoint: string) {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get<T[]>(baseUrl + endpoint)
      .then(({ data }) => setData(data))
      .catch((e) => setError(e));

    setIsLoading(false);
  }, [endpoint]);

  return {
    data,
    isLoading,
    error,
  };
}
