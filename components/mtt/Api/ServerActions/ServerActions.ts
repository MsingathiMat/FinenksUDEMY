"use server";

import { getActiveUser } from "../helpers/getActiveUser";



type PayLoadType = { userName: string; UserId: string; src: string };
async function ActiveUserAction<T>() {
  const Data = (getActiveUser<PayLoadType>()) as Promise<T>;


  return await Data;
}

export { ActiveUserAction };
