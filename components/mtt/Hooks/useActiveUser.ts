"use client";

import { useEffect, useState } from "react";
import { ActiveUserAction } from "../Api/ServerActions/ServerActions";

const useActiveUser = <T>() => {
  const [userData, setUserData] = useState<T | null>(null);

  useEffect(() => {
    ActiveUserAction<T>().then((data) => setUserData(data));
  }, []);

  return { userData };
};

export default useActiveUser;
