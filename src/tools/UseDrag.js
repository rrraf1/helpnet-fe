import { useCallback, useEffect, useState } from "react";

export const useDrag = ({ ref }) => {
  const [dragInfo, setDragInfo] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const setInitialPosition = useCallback((x, y) => {
    setPosition({ x, y });
  }, []);

  const handleMouseDown = useCallback(
    (event) => {
      if (ref.current) {
        const startX = event.clientX - position.x;
        const startY = event.clientY - position.y;
        setDragInfo({ startX, startY });
        setIsDragging(true);
      }
    },
    [position.x, position.y, ref]
  );

  const handleMouseMove = useCallback(
    (event) => {
      if (isDragging && dragInfo) {
        const newX = event.clientX - dragInfo.startX;
        const newY = event.clientY - dragInfo.startY;
        setPosition({ x: newX, y: newY });
      }
    },
    [isDragging, dragInfo]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setDragInfo(null);
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return { position, handleMouseDown, setInitialPosition };
};
