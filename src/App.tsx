import { useSmoothScroll } from "./lib/useSmoothScroll";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Recalibration } from "./components/Recalibration";
import { SelfRecognition } from "./components/SelfRecognition";
import { Comparison } from "./components/Comparison";
import { FaithBand } from "./components/FaithBand";
import { Authority } from "./components/Authority";
import { CinematicExperience } from "./components/CinematicExperience";
import { PrecisionVocabulary } from "./components/PrecisionVocabulary";
import { Future } from "./components/Future";
import { Enrollment } from "./components/Enrollment";
import { Footer } from "./components/Footer";

export default function App() {
  useSmoothScroll();

  return (
    <div className="grain relative min-h-screen bg-bg text-fg">
      <div className="relative z-10">
        <Header />
        <main>
          {/* Enrollment journey: identity → self-recognition → the shift →
              conviction → proof → who you become → the after → the invitation */}
          <Hero />
          <Recalibration />
          <SelfRecognition />
          <Comparison />
          <FaithBand />
          <Authority />
          <CinematicExperience />
          <PrecisionVocabulary />
          <Future />
          <Enrollment />
        </main>
        <Footer />
      </div>
    </div>
  );
}
