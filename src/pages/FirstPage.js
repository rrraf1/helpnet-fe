import { gsap } from "gsap";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Intro from "../components/Intro";
import CardStack from "../components/CardStack";

export default function FirstPage({user}) {
  useEffect(() => {
    gsap.fromTo(
      ".text-container h1",
      { x: -100 },
      { x: 40, stagger: { each: 0.05, start: 0 }, duration: 0.3 }
    );

    const headings = document.querySelectorAll(".text-container h1");

    headings.forEach((heading) => {
      heading.addEventListener("mouseenter", () => {
        gsap.to(heading, { rotationX: 40, duration: 0.1, rotationY: 30 });
      });

      heading.addEventListener("mouseleave", () => {
        gsap.to(heading, { rotationX: 0, duration: 0.3, rotationY: 0 });
      });
    });
  }, []);

  

  return (
    <>
      {!user && <Intro />}
      <div className="landing-page-container" style={{ overflow: "hidden" }}>
        <Navbar user={user}/>
        <div id="firstPage">
          <div className="text-container">
            <h1>Share</h1>
            <h1>Your</h1>
            <h1>Thought</h1>
          </div>
        </div>
        <div className="bg-square"></div>
        <div className="bg-circle"></div>
        <div className="bg-square2"></div>
        <div className="content-container">
          <div className="scroll-container">
            <p className="scroll__text">[ </p>
            <p className="scroll__text">Scroll Down</p>
            <p className="scroll__text"> ]</p>
          </div>
          <CardStack user={user} />
        </div>
        <Footer />
      </div>
    </>
  );
}
