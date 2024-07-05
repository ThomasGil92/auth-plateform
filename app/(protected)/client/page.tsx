"use client"

import { UserInfos } from "../_components/user-infos";
import { useCurrentUser } from "@/hooks/use-current-user";

const ClientPage =  () => {
  const user =useCurrentUser();
  return <UserInfos user={user} label='Client component 💻' />;
};

export default ClientPage;
