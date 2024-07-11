import { useEffect, useState } from "react";
const useAppWrite = (fn) => {
  const [Dtata, setData] = useState([]);
  const [loding, setLoading] = useState(true);

  const fechData = async () => {
    try {
      const res = await fn();
      setData(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fechData();
  }, []);
  const refechData = () => fechData();
  return { Dtata, loding, refechData };
};

export default useAppWrite;
