// app/auth/signin/page.tsx

"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";

const SignInPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("/admin") || "/admin";
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    const result = await signIn("github", { redirect: false, callbackUrl });
    setIsLoading(false);
    if (result?.error) {
      setError(result.error);
    } else if (result?.url) {
      router.push(result.url);
    } 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          onClick={handleSignIn}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full disabled:opacity-50 flex justify-center items-center"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : (
            <>
                <FaGithub className="mr-2" />
                Sign in with GitHub 
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default SignInPage;
