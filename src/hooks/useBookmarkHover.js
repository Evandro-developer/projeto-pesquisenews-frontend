import { useState } from "react";

function useBookmarkHover() {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  return { isHovered, handleMouseEnter, handleMouseLeave };
}

export default useBookmarkHover;
