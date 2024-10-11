// app/admin/page.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const Admin = async () => {
//   const session = await getServerSession(authOptions);

//   if (!session || !session.user.isAdmin) {
    
//     redirect("/api/auth/signin");
//   }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1>
      {/* Your admin content goes here */}
      <p className="text-xl">Welcome, Admin!</p>
    </div>
  );
};

export default Admin;
