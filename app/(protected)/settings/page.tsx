import { auth, signOut } from "@/auth";

const SettingsPage = async () => {
  const session = await auth();
  console.log(session?.user.role)
  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button>Sign out</button>
      </form>
    </div>
  );
};

export default SettingsPage;
