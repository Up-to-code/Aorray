import { useEffect, useState } from "react";

const useAppWrite = (fn) => {
  const [Dtata, setData] = useState([]);
  const [loding, setLoading] = useState(true);
  
  const fechData = async () => {
    try {
      const res = await fn();
      setData(res);
      setLoading(false);
      console.log(res.Avtar)
    } catch (error) {
      Alert("Error", error.message);
    }
  };
  useEffect(() => {
    fechData();
  }, []);
  const refechData =  () => fechData()
  return { Dtata, loding ,refechData};
};

export default useAppWrite;