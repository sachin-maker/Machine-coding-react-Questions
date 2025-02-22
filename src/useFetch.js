import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const resopnse = await fetch(url);
      if (!resopnse.ok) throw new Error(resopnse.statusText);

      const result = await resopnse.json();

      setData(result);
      setLoading(false);
      setError(null);
    } catch (error) {
      setError(`${error} Some Error Ocuured`);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;