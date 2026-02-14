"use client";

import { supabase } from "@/lib/supabaseClient";
import { Bookmark } from "@/types/bookmark";

export default function BookmarkList({ bookmarks }: { bookmarks: Bookmark[] }) {
  const deleteBookmark = async (id: string) => {
    await supabase.from("bookmarks").delete().eq("id", id);
  };

  return (
    <div className="space-y-3">
      {bookmarks.map((b) => (
        <div key={b.id} className="bg-white p-4 rounded shadow flex justify-between">
          <a href={b.url} target="_blank" className="text-blue-600">
            {b.title}
          </a>
          <button onClick={() => deleteBookmark(b.id)} className="text-red-500">
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
