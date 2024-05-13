import { useState, useEffect } from "react";

const useMobileWidth = () => {
  const [isMobileWidth, setIsMobileWidth] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileWidth(window.innerWidth <= 800); // Adjust the value as per your mobile breakpoint
    };

    // Initial check
    handleResize();

    // Listen to window resize event
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobileWidth;
};

export default useMobileWidth;
