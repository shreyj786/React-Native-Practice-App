import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (endpoint, query, setDelay) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      "X-RapidAPI-Key": "853beb06demshcbd7fdfaf33636cp1d8425jsn8b395177af73",
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    params: { ...query },
  };

  const fetchData = async () => {
    let response;

    setIsLoading(true);
    try {
        response = await axios.request(options);
        console.log("Data fetch");
        setData(response.data.data);
    } catch (error) {
      setError(error);
      alert("There is an error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (setDelay) {
      setTimeout(function () {
        fetchData();
      }, 2000);
    } else {
      fetchData();
    }
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
