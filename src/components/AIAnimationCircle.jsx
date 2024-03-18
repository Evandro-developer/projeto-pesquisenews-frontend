import React, { useEffect, useState } from "react";

function AIAnimationCircle({ animate, completed }) {
  const generateRandomOffset = () => {
    const minOffset = 0.25 * 565.48;
    const maxOffset = 0.05 * 565.48;
    return Math.random() * (maxOffset - minOffset) + minOffset;
  };

  const [randomOffset, setRandomOffset] = useState(generateRandomOffset());

  useEffect(() => {
    if (animate && !completed) {
      setRandomOffset(generateRandomOffset());
    }
  }, [animate, completed]);

  const circleStyle = completed
    ? { strokeDashoffset: 0 }
    : animate
    ? {
        animation: "fill 15s forwards",
        strokeDasharray: "565.48",
        strokeDashoffset: `${randomOffset}`,
        transformOrigin: "center",
      }
    : {};

  const needleStyle = {
    transformOrigin: "50% 50%",
    animation:
      animate && !completed
        ? "rotate 9s infinite linear"
        : "rotate 3s infinite linear",
  };

  return (
    <svg
      width="74"
      height="74"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className="ai-animation-circle"
    >
      <circle
        cx="100"
        cy="100"
        r="90"
        stroke="#d1d2d6"
        strokeWidth="10"
        fill="none"
      />
      <circle
        cx="100"
        cy="100"
        r="90"
        stroke="#ab68ff"
        strokeWidth="10"
        fill="none"
        style={circleStyle}
      />
      <g style={needleStyle}>
        <path
          d="M 100 55 Q 105 50, 110 100 Q 105 150, 100 145 Q 95 150, 90 100 Q 95 50, 100 55"
          fill="#ab68ff"
        />
        <circle cx="100" cy="100" r="5" fill="white" />
      </g>
    </svg>
  );
}

export default AIAnimationCircle;
