import { useEffect, useState } from "react";
import api from "../slices/axios";
import API_URL from "../config/config";
import Card from "./Card";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function CardStack({ user }) {
  const [letters, setLetters] = useState([]);
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const fetchLetter = async () => {
      try {
        const response = await api.get(`${API_URL}/letter/get`);
        setLetters(response.data);
      } catch (error) {
        console.error("Failed to get letters");
      }
    };
    fetchLetter();
  }, [setLetters]);

  gsap.to(".card-container", {
    scrollTrigger: {
      trigger: ".card-container",
      start: "center 50vh",
      end: "bottom center",
      scrub: 1,
      markers: true
    },
    y: "10px"
  })

  return (
    <div className="container-card-stack">
      <div className="card-stack">
        {letters.map((letters) => (
          <Card
            key={letters.letter_id}
            text={letters.letter_text}
            author={letters.letter_author}
            user={user}
          />
        ))}
      </div>
    </div>
  );
}
