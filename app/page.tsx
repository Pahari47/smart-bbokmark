"use client";

import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const signIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/dashboard`,
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12">
      <div className="max-w-2xl text-center space-y-8">
        <h1 className="text-4xl font-bold text-black">Smart Bookmarks</h1>
        <p className="text-xl text-gray-700">
          Your personal bookmark manager with real-time synchronization
        </p>
        
        <div className="space-y-4 text-left max-w-lg mx-auto">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-black">Features</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Secure Google OAuth authentication - no passwords needed</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Private bookmarks - your links are only visible to you</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Real-time updates - see changes instantly across all your devices</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Simple and fast - add, view, and delete bookmarks with ease</span>
              </li>
            </ul>
            <h2 className="text-2xl font-semibold text-black">Request</h2>
            <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Took me onboard</span>
              </li>
          </div>
        </div>

        <div className="pt-6">
          <button
            onClick={signIn}
            className="bg-white text-black border-2 border-black px-8 py-3 rounded-lg hover:bg-gray-100 font-semibold text-lg transition-colors"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}
