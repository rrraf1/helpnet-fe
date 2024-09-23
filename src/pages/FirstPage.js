import { gsap } from "gsap";
import { useEffect } from "react";

export default function FirstPage() {
  useEffect(() => {
    gsap.fromTo(
      ".text-container h1",
      { x: -100 },
      { x: 40, stagger: { each: 0.05, start: 0 }, duration: 0.3 }
    );
  }, []);
  return (
    <>
    <Cursor />
    <div id="firstPage">
      <div className="text-container">
        <h1>Share</h1>
        <h1>Your</h1>
        <h1>Thought</h1>
      </div>
    </div>
    </>
  );
}
