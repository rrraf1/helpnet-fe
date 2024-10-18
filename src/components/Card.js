import { Typography } from "@mui/material";
import { Share } from "@mui/icons-material";
import Draggable from "react-draggable";

export default function Card({ text, author, user }) {
  const shareImage = () => {
    if (user == null) {
      alert("You must be logged in to share this post");
    } else {
      alert("Shared successfully!");
    }
  };

  return (
    <Draggable>
      <div
        className="card-container"
        style={{
          cursor: "move",
        }}
      >
        <div className="content-wrapper">
          <Typography variant="h2" className="card__text">
            {text}
          </Typography>
          <div className="card-footer">
            <Typography variant="caption" className="card__author">
              {author ? `By: ${author}` : "Unknown Author"}
            </Typography>
            <Share className="card__share" onClick={shareImage} />
          </div>
        </div>
      </div>
    </Draggable>
  );
}
