import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Intro() {
  const overlayRef = useRef(null);
  const counterRef = useRef(null);

  useEffect(() => {
    function startLoader() {
      let counterElement = counterRef.current;
      let currentValue = 0;

      function updateCounter() {
        if (currentValue === 100) {
          return;
        }

        currentValue += Math.floor(Math.random() * 10) + 1;

        if (currentValue > 100) {
          currentValue = 100;
        }

        counterElement.textContent = currentValue;

        let delay = Math.floor(Math.random() * 200) + 50;
        setTimeout(updateCounter, delay);
      }

      updateCounter();
    }
    startLoader();

    const tl = gsap.timeline();

    tl.to(counterRef.current, {
      duration: 0.25,
      delay: 3.5,
      opacity: 0,
    })
      .to(".bar", {
        duration: 1.5,
        height: 0,
        stagger: {
          amount: 0.5,
        },
        ease: "power4.inOut",
      })
      .from(".h1", {
        duration: 1.5,
        y: 700,
        stagger: {
          amount: 0.5,
        },
        ease: "power4.inOut",
      })
      .set([overlayRef.current, counterRef.current], {
        zIndex: 0,
      });
  }, []);

  return (
    <>
      <h1 ref={counterRef} className="counter">
        0
      </h1>
      <div ref={overlayRef} className="overlay">
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </>
  );
}
