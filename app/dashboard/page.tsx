"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import AddBookmarkForm from "@/components/AddBookmarkForm";
import BookmarkList from "@/components/BookmarkList";
import { Bookmark } from "@/types/bookmark";

export default function Dashboard() {
  const router = useRouter();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookmarks = async () => {
    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setBookmarks(data);
  };

  useEffect(() => {
    let channel: any;

    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/");
        return;
      }

      setLoading(false);
      await fetchBookmarks();

      channel = supabase
        .channel("bookmarks-realtime")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "bookmarks",
          },
          () => {
            fetchBookmarks();
          }
        )
        .subscribe();
    };

    init();

    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, []);


  if (loading) return <p className="p-10">Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="max-w-xl mx-auto mt-10 space-y-6">
        <AddBookmarkForm />
        <BookmarkList bookmarks={bookmarks} />
      </div>
    </>
  );
}
