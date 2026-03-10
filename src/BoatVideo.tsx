import { useEffect, useState } from "react";
import boatVideo from "./assets/boat-video.mp4";

const curvedClipPath = "ellipse(130% 100% at 50% 100%)";

function BoatVideo() {
  const [isCurved, setIsCurved] = useState(false);

  useEffect(() => {
    let observer: MutationObserver | null = null;
    let rafId: number | null = null;
    let isDisposed = false;

    const updateCurveState = (target: Element | null) => {
      if (!target) return;
      const targetOpacity = Number.parseFloat(getComputedStyle(target).opacity);
      setIsCurved(targetOpacity >= 0.99);
    };

    const attachObserver = () => {
      if (isDisposed) return;

      const root = document.getElementById("root");
      const firstSiblingDiv = root?.firstElementChild;

      if (!firstSiblingDiv) {
        rafId = window.requestAnimationFrame(attachObserver);
        return;
      }

      updateCurveState(firstSiblingDiv);

      observer = new MutationObserver(() => {
        updateCurveState(firstSiblingDiv);
      });

      observer.observe(firstSiblingDiv, {
        attributes: true,
        attributeFilter: ["style", "class"],
      });
    };

    attachObserver();

    return () => {
      isDisposed = true;
      if (observer) observer.disconnect();
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      className="relative h-100vh w-full overflow-hidden"
      style={{
        clipPath: isCurved ? curvedClipPath : "inset(0 0 0 0)",
        WebkitClipPath: isCurved ? curvedClipPath : "inset(0 0 0 0)",
        transition: "clip-path 280ms ease-out, -webkit-clip-path 280ms ease-out",
        willChange: "clip-path",
      }}
    >
      <video
        className="absolute inset-0 block h-full w-full object-cover animate-boat-video-intro [transform:translateZ(0)] [backface-visibility:hidden] will-change-[opacity]"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src={boatVideo} type="video/mp4" />
      </video>
    </div>
  );
}

export default BoatVideo;
