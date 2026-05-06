import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { springConfig, staggerContainer, fadeInUp } from "../lib/animations";
import WaitlistForm from "../components/WaitlistForm";
import MembershipPage from "./MembershipPage";
import PhilosophyPage from "./PhilosophyPage";
import SafetyPage from "./SafetyPage";
// --- Types & Data ---
type VibeKey = "cafes" | "hiking" | "chats";

interface VibeData {
  id: VibeKey;
  label: string;
  bg: string;
  color: string;
  images: string[];
}

const VIBES: Record<VibeKey, VibeData> = {
  cafes: {
    id: "cafes",
    label: "local cafes",
    bg: "bg-[#F3EBE1]",
    color: "text-terracotta",
    images: [
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop"
    ]
  },
  hiking: {
    id: "hiking",
    label: "hiking",
    bg: "bg-[#E6EBE6]",
    color: "text-forest",
    images: [
      "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop"
    ]
  },
  chats: {
    id: "chats",
    label: "deep chats",
    bg: "bg-[#EBEAF0]",
    color: "text-ink",
    images: [
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop"
    ]
  }
};

const LOCATIONS = [
  { id: "Ottawa", label: "Ottawa" },
  { id: "The Glebe", label: "The Glebe" },
  { id: "Hintonburg", label: "Hintonburg" }
];

// --- Custom Animated Dropdown Component ---
interface Option {
  id: string;
  label: string;
}

function AnimatedSelect({
  value,
  options,
  onChange,
  colorClass = "text-ink"
}: {
  value: string;
  options: Option[];
  onChange: (id: any) => void;
  colorClass?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block mx-2" ref={ref}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className={`border-b-4 border-ink/30 hover:border-ink transition-colors pb-1 flex items-center gap-2 ${colorClass}`}
      >
        {value}
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={springConfig}
          width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
        >
          <path d="M6 9L12 15L18 9" />
        </motion.svg>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={springConfig}
            className="absolute top-full mt-4 left-1/2 -translate-x-1/2 bg-paper p-2 rounded-2xl shadow-tactile z-50 min-w-[220px] flex flex-col gap-1 border border-sand"
          >
            {options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => {
                  onChange(opt.id);
                  setOpen(false);
                }}
                className="text-left px-5 py-3 text-2xl hover:bg-sand/40 rounded-xl transition-colors font-serif text-ink"
              >
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Main Page Component ---
export default function LandingPage() {
  const [location, setLocation] = useState("Ottawa");
  const [interest, setInterest] = useState<VibeKey>("cafes");

  const currentVibe = VIBES[interest];
  const mosaicRef = useRef(null);

  // Parallax calculations for 3 columns
  const { scrollYProgress } = useScroll({ target: mosaicRef, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -250]);

  // Vibe options formatting for dropdown
  const vibeOptions = Object.values(VIBES).map(v => ({ id: v.id, label: v.label }));

  return (
    <div className={`transition-colors duration-1000 ease-in-out overflow-x-hidden ${currentVibe.bg}`}>

      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">

        {/* Animated Polaroid Backgrounds */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <AnimatePresence mode="popLayout">
            {currentVibe.images.map((src, i) => {
              const positions = [
                "top-[15%] left-[5%] md:left-[15%]",
                "bottom-[15%] right-[5%] md:right-[15%]",
                "top-[20%] right-[5%] md:right-[20%] hidden md:block"
              ];
              const rotations = [-12, 8, 15];

              return (
                <motion.img
                  key={`${interest}-${i}`}
                  src={src}
                  initial={{ opacity: 0, scale: 0.8, y: 50, rotate: 0 }}
                  animate={{
                    opacity: 0.8,
                    scale: 1,
                    y: [0, -15, 0],
                    rotate: rotations[i]
                  }}
                  exit={{ opacity: 0, scale: 0.8, y: -50 }}
                  transition={{
                    opacity: { duration: 0.6 },
                    scale: { duration: 0.6, type: "spring" },
                    y: { repeat: Infinity, duration: 5 + i, ease: "easeInOut" },
                    rotate: { duration: 0.6, type: "spring" }
                  }}
                  className={`absolute rounded-xl border-[10px] border-paper shadow-tactile object-cover w-48 h-64 md:w-64 md:h-80 ${positions[i]}`}
                />
              );
            })}
          </AnimatePresence>
        </div>

        {/* Central Frosted Glass Text Container */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="relative z-10 w-full max-w-5xl text-center flex flex-col items-center bg-paper/40 backdrop-blur-md px-6 py-16 md:p-16 rounded-[3rem] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.05)] border border-white/50"
        >
          <motion.h1 variants={fadeInUp} className="font-serif text-4xl md:text-6xl lg:text-7xl text-ink leading-[1.5] md:leading-[1.4]">
            I want to meet people in <br className="md:hidden" />
            <AnimatedSelect
              value={location}
              options={LOCATIONS}
              onChange={setLocation}
            />
            <br className="hidden md:block" />
            who love <br className="md:hidden" />
            <AnimatedSelect
              value={currentVibe.label}
              options={vibeOptions}
              onChange={setInterest}
              colorClass={currentVibe.color}
            />.
          </motion.h1>

          <motion.p variants={fadeInUp} className="mt-8 text-lg md:text-xl text-ink/80 max-w-2xl font-light">
            Skip the small talk. Join curated, small-group offline experiences designed for genuine adult friendships.
          </motion.p>
        </motion.div>
      </section>

      {/* 2. PARALLAX MOSAIC SECTION */}
      <section ref={mosaicRef} className="py-32 md:py-48 px-6 bg-paper text-ink overflow-hidden rounded-t-[3rem] relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 md:mb-32">
            <h2 className="font-serif text-4xl md:text-6xl max-w-3xl mx-auto leading-tight">
              Meaningful connections, organically.
            </h2>
          </div>

          {/* 3-Column Masonry Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 pb-32">

            {/* Column 1 (Moves UP slightly) */}
            <motion.div style={{ y: y1 }} className="flex flex-col gap-6 md:gap-8 md:pt-12">
              <img
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1000&auto=format&fit=crop"
                className="rounded-3xl object-cover w-full h-80 shadow-tactile"
                alt="Friends laughing at dinner"
              />
              <div className="bg-forest text-paper p-8 md:p-10 rounded-3xl shadow-tactile">
                <h3 className="font-serif text-2xl md:text-3xl mb-3">No awkward networking.</h3>
                <p className="font-light text-paper/80 text-lg">Just shared interests, good food, and natural conversation.</p>
              </div>
            </motion.div>

            {/* Column 2 (Moves DOWN slightly, creating depth) */}
            <motion.div style={{ y: y2 }} className="flex flex-col gap-6 md:gap-8 md:-mt-24">
              <div className="bg-terracotta text-paper p-10 md:p-14 rounded-3xl h-72 md:h-80 flex flex-col justify-center shadow-tactile">
                <h3 className="font-serif text-3xl md:text-4xl mb-4 leading-tight">
                  "I finally found my people."
                </h3>
                <p className="font-light text-paper/90 text-lg md:text-xl">— Sarah, 31</p>
              </div>
              <img
                src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=1000&auto=format&fit=crop"
                className="rounded-3xl object-cover w-full h-96 shadow-tactile"
                alt="Group of friends outdoors"
              />
            </motion.div>

            {/* Column 3 (Moves UP faster) */}
            <motion.div style={{ y: y3 }} className="flex flex-col gap-6 md:gap-8 md:pt-40">
              <img
                src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1000&auto=format&fit=crop"
                className="rounded-3xl object-cover w-full h-72 shadow-tactile"
                alt="Friends cheering with coffee"
              />
              <div className="bg-ink text-paper p-8 md:p-10 rounded-3xl shadow-tactile">
                <h3 className="font-serif text-2xl md:text-3xl mb-3">Zero algorithms.</h3>
                <p className="font-light text-paper/80 text-lg">Offline connections designed purely for the real world.</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <MembershipPage />
      <PhilosophyPage />
      {/* 3. WAITLIST SECTION */}
      <section className="bg-forest py-32 px-6 flex justify-center relative z-20">

        <WaitlistForm />
      </section>
      <SafetyPage />





    </div>
  );
}