"use client";
import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";

const SettingsPage = () => {
  const user = useCurrentUser();

  return (
    <div className="bg-white p-10 rounded-xl">
      {JSON.stringify(user)}
      {/* <form
        // action={async () => {
        //   "use server";
        //   await signOut();
        // }}
      > */}
      <button onClick={() => logout()}>Sign out</button>
      {/* </form> */}
    </div>
  );
};

export default SettingsPage;
