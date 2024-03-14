import React, { useEffect, useState } from "react";
type RadialProgressProps = {
  children: React.ReactNode;
  file: File | undefined;
};
const RadialProgress = ({ children, file }: RadialProgressProps) => {
  const [percentage, setpercentage] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setpercentage((beforeValue) => {
        const newValue = beforeValue >= 100 ? 100 : beforeValue + 50;
        if (newValue >= 100) {
          clearInterval(timer);
        }
        return newValue;
      });
    }, 1200);
    return () => {
      clearInterval(timer);
      setpercentage(10);
    };
  }, [file]);

  return (
    <div
      className={`radial-progress ${
        percentage >= 99 ? "text-success " : "text-error"
      } `}
      style={{
        "--value": percentage,
        "--size": "9rem",
        "--thickness": "2px",
      }}
      role="progressbar"
    >
      {children}
    </div>
  );
};

export default RadialProgress;
