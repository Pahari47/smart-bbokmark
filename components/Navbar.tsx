"use client";

import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <div className="flex justify-between p-4 bg-white border-b border-gray-200">
      <h1 className="font-bold">Smart Bookmarks</h1>
      <button onClick={logout} className="text-red-500">
        Logout
      </button>
    </div>
  );
}
