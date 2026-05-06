import { motion } from "framer-motion";
import { useState } from "react";
import { springConfig } from "../lib/animations";

const STORY_BLOCKS = [
  { id: 1, text: "We realized making friends as an adult is unnecessarily hard. Dating apps exist for romance, networking apps for jobs, but nothing for genuine platonic connection.", img: "bg-terracotta", icon: "🤔" },
  { id: 2, text: "So we built a platform focused entirely on small-group, curated offline experiences. No endless swiping, no awkward 1-on-1s.", img: "bg-forest", icon: "🌿" },
  { id: 3, text: "Our mission is simple: to make your city feel like a neighborhood again. Welcome to the club.", img: "bg-ink", icon: "🤝" }
];

export default function AboutPage() {
  const [activeStep, setActiveStep] = useState(1);
  const activeBlock = STORY_BLOCKS.find(b => b.id === activeStep)!;

  return (
    <div className="max-w-7xl mx-auto px-6 py-32 flex flex-col md:flex-row gap-16 relative items-start">
      {/* Scroll Text */}
      <div className="w-full md:w-1/2 flex flex-col gap-[50vh] pb-[50vh] pt-[20vh]">
        {STORY_BLOCKS.map(block => (
          <motion.div key={block.id} onViewportEnter={() => setActiveStep(block.id)} viewport={{ margin: "-50% 0px -50% 0px" }} className={`transition-opacity duration-700 ${activeStep === block.id ? "opacity-100" : "opacity-30"}`}>
            <h2 className="font-serif text-3xl md:text-5xl leading-tight">{block.text}</h2>
          </motion.div>
        ))}
      </div>

      {/* Pinned Visual */}
      <div className="w-full md:w-1/2 sticky top-[20vh] h-[60vh] hidden md:block">
        <motion.div animate={{ backgroundColor: activeStep === 1 ? "#E56B55" : activeStep === 2 ? "#2A4B46" : "#2D2A26" }} transition={{ duration: 0.8, ease: "easeInOut" }} className="w-full h-full rounded-[3rem] shadow-tactile flex items-center justify-center overflow-hidden relative">
          <motion.div key={activeStep} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={springConfig} className="text-9xl">
            {activeBlock.icon}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}