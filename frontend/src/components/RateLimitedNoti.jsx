import { ZapIcon, X as CloseIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

export default function RateLimitedNoti({ close, isRateLimit }) {
  const [rateLimitCountdown, setRateLimitCountdown] = useState(10);
  const queryClient = useQueryClient();
  useEffect(() => {
    if (!isRateLimit) return;

    setRateLimitCountdown(10);

    const tick = (remaining) => {
      if (remaining <= 0) {
        close();
        queryClient.invalidateQueries(["notes"]);
        return;
      }

      setRateLimitCountdown(remaining - 1);
      setTimeout(() => tick(remaining - 1), 1000);
    };

    tick(10);
  }, [isRateLimit]);

  return (
    <div className="mx-auto max-w-6xl py-8 px-6 ">
      <div className="border border-primary/30 rounded-lg shadow-lg bg-primary/10">
        <div className="flex flex-col md:flex-row items-center py-6 px-6 relative">
          <div className="felx-shrink-0 bg-primary/20 rounded-full mb-4 md:mb-0 md:mr-6 p-4">
            <ZapIcon className="size-12 text-primary" />
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-primary text-center md:text-left">
              Rate Limit Reached.
            </h3>
            <p className="font-bold text-base-content">
              You've made too many requests in a short period.Please wait a
              moment.
            </p>
            <p className="mb-1 text-sm font-bold">
              Try again in a few seconds for the best experience.
            </p>
          </div>
          <div className="absolute top-1 right-1 text-base-content rounded-full">
            {rateLimitCountdown}
          </div>
        </div>
      </div>
    </div>
  );
}
