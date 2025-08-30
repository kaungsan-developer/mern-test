import { useState, useEffect } from "react";
import NoteCard from "../components/NoteCard";
import axios from "../libs/axios";
import { useQuery } from "@tanstack/react-query";
import RateLimitedNoti from "../components/RateLimitedNoti";
import { toast } from "react-hot-toast";

export default function Home() {
  const [isRateLimit, setIsRateLimit] = useState(false);
  async function fetchAllNotes() {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/notes`);
    setIsRateLimit(false);

    if (!res.ok) {
      if (res.status === 429) {
        setIsRateLimit(true);
        const rateLimitError = new Error();
        rateLimitError.status = res.status;
        throw rateLimitError;
      } else {
        toast.error("Fail to Load Notes");
      }
      throw new Error();
    }

    return res.json();
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notes"],
    queryFn: fetchAllNotes,
    retry: (failureCount, error) => {
      console.log(error);
      if (error.status === 429) return false;
    },
  });

  const closeRateLimitNoti = () => {
    setIsRateLimit(false);
  };

  if (isLoading) return <div>Loading</div>;

  return (
    <div className="container py-3 px-6 mx-auto">
      {isRateLimit && (
        <RateLimitedNoti close={closeRateLimitNoti} isRateLimit={isRateLimit} />
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full place-items-center">
        {!isLoading &&
          !isError &&
          data &&
          data.map((note) => {
            return <NoteCard key={note._id} note={note} />;
          })}
      </div>
    </div>
  );
}
