import { useCallback, useEffect, useState } from "react";

export const Countdown = ({ deadline }: { deadline: number }) => {
  // const [deadline, setDeadline] = useState<Date>();
  const [countdown, setCountdown] = useState("");

  // countdown until next powt is
  const updateCountdown = useCallback((deadline: number) => {
    const now = new Date();
    const timeDifference = deadline - now.getTime();

    if (timeDifference <= 0) {
      // The deadline has passed.
      document.getElementById("deadline")!.textContent = "Time's up!";
    } else {
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      const countdownText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      setCountdown(countdownText);

      // Update the countdown every 1 second (1000 milliseconds)
      setTimeout(() => {
        updateCountdown(deadline);
      }, 1000);
    }
  }, []);

  useEffect(() => {
    // Start the countdown initially.
    updateCountdown(deadline);
  }, [updateCountdown, deadline]);

  return (
    <div>
      <h3 color="gray" className="ml-3 mt-4">
        Deadline
      </h3>
      <h3 id="deadline" className="ml-3">
        {countdown}
      </h3>
    </div>
  );
};
