"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AddBookmarkForm() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const addBookmark = async (e: React.FormEvent) => {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    await supabase.from("bookmarks").insert({
      title,
      url,
      user_id: user.id,
    });

    setTitle("");
    setUrl("");
  };

  return (
    <form onSubmit={addBookmark} className="bg-white p-4 rounded shadow space-y-3">
      <input
        placeholder="Title"
        className="w-full border p-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="URL"
        className="w-full border p-2"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button className="bg-black text-white px-4 py-2 rounded">
        Add Bookmark
      </button>
    </form>
  );
}
