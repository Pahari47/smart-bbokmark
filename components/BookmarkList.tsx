"use client";

import { supabase } from "@/lib/supabaseClient";
import { Bookmark } from "@/types/bookmark";

export default function BookmarkList({ bookmarks }: { bookmarks: Bookmark[] }) {
  const deleteBookmark = async (id: string) => {
    await supabase.from("bookmarks").delete().eq("id", id);
  };

  const normalizeUrl = (url: string) => {
    if (!url) return url;
    if (!url.match(/^https?:\/\//i)) {
      return `https://${url}`;
    }
    return url;
  };

  return (
    <div className="space-y-3">
      {bookmarks.map((b) => (
        <div key={b.id} className="bg-white p-4 rounded border border-gray-200 flex justify-between">
          <a href={normalizeUrl(b.url)} target="_blank" rel="noopener noreferrer" className="text-blue-600">
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
