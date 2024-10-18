import { useEffect, useState } from "react";
import api from "../slices/axios";
import API_URL from "../config/config";
import Card from "./Card";
console.log(API_URL);

export default function CardStack({ user }) {
  const [letters, setLetters] = useState([]);

  useEffect(() => {
    const fetchLetter = async () => {
      try {
        const response = await api.get(`${API_URL}/letters/get`);
        console.log(response.data);
        
        setLetters(response.data);
      } catch (error) {
        console.error("Failed to get letters");
      }
    };
    fetchLetter();
  }, [setLetters]);

  return (
    <div className="container-card-stack">
      {letters.map((letters, index) => (
        <Card
          key={letters.letter_id}
          text={letters.letter_text}
          author={letters.letter_author}
          user={user}
          style={{ zIndex: 3 + index }}
        />
      ))}
    </div>
  );
}
