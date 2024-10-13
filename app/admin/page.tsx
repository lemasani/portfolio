// app/admin/page.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import Image from "next/image";

const Admin = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    
    redirect("/api/auth/signin");
  }
  const profileImage = session.user.image || "/default-profile.png";

  return (

    <div className="min-h-screen p-10">
      <div className='top-bar flex flex-row justify-between items-center'>
        <h2 className='text-2xl font-bold'>Welcome, <br /> {session.user.name}</h2>
        <div className="image-container">
          <Image src={profileImage} 
          alt="Github Profile image" 
          width={100} height={100} 
          className="rounded-full" />

        </div>
      </div>

      <div className="stats-container mt-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5">
        
        <div className="stat">
          <h3>Projects</h3>
          <p>20</p>
        </div>
        <div className="stat">
          <h3>Services</h3>
          <p>30</p>
        </div>
      </div>
    </div>
  );
};

export default Admin;
