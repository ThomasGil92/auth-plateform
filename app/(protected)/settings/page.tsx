
import { currentUser } from "@/lib/auth";
import SettingsClient from "./components/SettingsClient";

const SettingsPage = async() => {
  const user = await currentUser();
  

  return (
   <SettingsClient user={user}/>
  );
};

export default SettingsPage;
