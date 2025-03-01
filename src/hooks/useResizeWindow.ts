import { useEffect, useState } from "react";

export const useWindowResize = () => {
  const [size, setSize] = useState([0, 0]);

  const getSize = () => setSize([window.innerWidth, window.innerHeight]);

  useEffect(() => {
    getSize();

    window.addEventListener("resize", getSize);

    return () => window.removeEventListener("resize", getSize);
  }, []);

  return size;
};