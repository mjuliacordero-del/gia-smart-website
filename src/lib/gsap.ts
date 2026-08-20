import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Brand-consistent authority easing for GSAP timelines.
gsap.defaults({ ease: "power3.out" });

export { gsap, ScrollTrigger };
