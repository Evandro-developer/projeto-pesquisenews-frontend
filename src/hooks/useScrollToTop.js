import { useState, useEffect } from "react";

export const useScrollToTop = (
  itemsLength,
  isConditionMet = true,
  threshold = 1
) => {
  const [isScrollVisible, setIsScrollVisible] = useState(false);

  useEffect(() => {
    setIsScrollVisible(itemsLength > threshold && isConditionMet);
  }, [itemsLength, isConditionMet, threshold]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return { isScrollVisible, scrollToTop };
};
