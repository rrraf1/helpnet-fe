import { Typography } from "@mui/material";
import { Share } from "@mui/icons-material";
import { useDrag } from "../tools/UseDrag";
import { useRef, useEffect } from "react";

export default function Card({ text, author, user }) {
  const draggableRef = useRef(null);

  const { position, handleMouseDown, setInitialPosition } = useDrag({
    ref: draggableRef,
  });

  useEffect(() => {
    if (draggableRef.current) {
      const rect = draggableRef.current.getBoundingClientRect();
      setInitialPosition(rect.left, rect.top);
    }
  }, [setInitialPosition]);

  const shareImage = () => {
    if (user == null) {
      alert("You must be logged in to share this post");
    } else {
      alert("Shared successfully!");
    }
  };

  return (
    <div
      className="card-container"
      ref={draggableRef}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        cursor: "move",
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="content-wrapper">
        <Typography variant="h2" className="card__text">
          {text}
        </Typography>
        <Typography variant="caption" className="card__author">
          {author ? `By: ${author}` : "Unknown Author"}
        </Typography>
        <Share className="card__share" onClick={shareImage} />
      </div>
    </div>
  );
}
