import { clerkClient } from "@clerk/nextjs/server";
import ManageAdmins from "./_components/manage-admins";

export const dynamic = "force-dynamic";

async function AdminsPage() {
  const clerkUsers = await clerkClient.users.getUserList();

  const users = clerkUsers.data.map((user) => ({
    id: user.id,
    email: user.emailAddresses[0].emailAddress,
    imageUrl: user.imageUrl,
  }));

  return (
    <div>
      <div className="flex justify-center items-center p-4 ">
        <h1 className=" text-4xl font-bold">Manage Admins</h1>
      </div>
      <p className="text-center text-muted-foreground">
        Select from users and make an user admin or select from admin and remove
        an user from admin
      </p>
      <div>
        <ManageAdmins clerkUsers={users} />
      </div>
    </div>
  );
}
export default AdminsPage;
