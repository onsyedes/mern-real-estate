import { useState } from "react";
import { useAppDispatch } from "../hooks";
import { logout } from "../../features/userSlice";

interface Error {
  message: string;
}

interface FetchDataResponse<T> {
  data: T | null;
  error: Error | null;
}

const useFetch = <T,>() => {
  const [error, setError] = useState<Error | null>(null);
  const dispatch = useAppDispatch();
  const fetchData = async (
    url: string,
    options: RequestInit
  ): Promise<FetchDataResponse<T>> => {
    try {
      const response = await fetch(url, options);
      const responseData = await response.json();

      if (response.status === 403) {
        // Logout user if unauthorized
        dispatch(logout());
      }

      if (!response.ok) {
        // Handle error and set error state
        setError(responseData);
        return { data: null, error: responseData };
      }

      return { data: responseData, error: null };
    } catch (error) {
      // Handle network errors
      setError({ message: error.message });
      return { data: null, error: { message: error.message } };
    }
  };

  return { fetchData, error };
};

export default useFetch;
