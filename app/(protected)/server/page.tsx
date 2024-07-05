import { currentUser } from "@/lib/auth";
import { UserInfos } from "../_components/user-infos";

const ServerPage = async () => {
  const user = await currentUser();
  return <UserInfos user={user} label='Server component 💻' />;
};

export default ServerPage;
