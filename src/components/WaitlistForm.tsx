import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { springConfig, interactiveItem } from "../lib/animations";

// Horizontal Slide Variants (Step Container)
const stepVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 400 : -400, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.5, type: "spring", bounce: 0.2, staggerChildren: 0.1 } },
  exit: (dir: number) => ({ x: dir < 0 ? 400 : -400, opacity: 0, transition: { duration: 0.3 } }),
};

// Internal elements staggered fade-in-up
const itemVariants = {
  enter: { opacity: 0, y: 20 },
  center: { opacity: 1, y: 0, transition: springConfig },
};

const INTERESTS = [
  { id: "coffee", label: "Café Hopping", icon: "☕️" },
  { id: "hike", label: "Nature Walks", icon: "🌲" },
  { id: "art", label: "Gallery Tours", icon: "🎨" },
  { id: "food", label: "Dinner Clubs", icon: "🍝" },
];

export default function WaitlistForm() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState({ neighborhood: "", interests: [] as string[], email: "" });
  
  // Custom Toast State
  const [toast, setToast] = useState<{ message: string; id: number } | null>(null);

  const showToast = (message: string) => {
    const id = Date.now();
    setToast({ message, id });
  };

  // Auto-hide toast after 3 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setStep(step + newDirection);
    
    // Trigger warm contextual toasts based on the step they just finished
    if (newDirection > 0) {
      if (step === 0) showToast("Neighborhood locked in ✨");
      if (step === 1) showToast("Great vibe choices 🌿");
      if (step === 2) showToast("Welcome to the club 🥂");
    }
  };

  const toggleInterest = (id: string) => {
    setData(prev => ({
      ...prev,
      interests: prev.interests.includes(id) 
        ? prev.interests.filter(i => i !== id) 
        : [...prev.interests, id]
    }));
  };

  return (
    <div className="w-full max-w-2xl bg-gradient-to-br from-paper via-paper to-terracotta/15 text-ink rounded-[3rem] p-8 md:p-16 shadow-[0_20px_50px_-10px_rgba(42,75,70,0.15)] relative overflow-hidden min-h-[500px] flex flex-col justify-center border border-sand/50 ring-1 ring-white/50 backdrop-blur-sm">
      
      {/* Warm Progress Indicator */}
      <div className="absolute top-10 left-10 right-10 flex gap-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-1.5 flex-1 bg-sand/60 rounded-full overflow-hidden shadow-inner">
            <motion.div 
              className="h-full bg-gradient-to-r from-terracotta to-[#E8826F]"
              initial={{ width: "0%" }}
              animate={{ width: step >= i ? "100%" : "0%" }}
              transition={{ duration: 0.6, ease: "easeInOut" }} 
            />
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        
        {/* STEP 0: Location */}
        {step === 0 && (
          <motion.div key="step0" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit" className="flex flex-col gap-6 pt-8">
            <motion.h3 variants={itemVariants} className="font-serif text-3xl md:text-4xl leading-tight text-ink">
              Where do you spend most of your time?
            </motion.h3>
            <motion.p variants={itemVariants} className="text-ink/60 text-lg">
              We curate experiences near you.
            </motion.p>
            <motion.input 
              variants={itemVariants}
              type="text" 
              placeholder="e.g., The Glebe, Downtown..." 
              value={data.neighborhood} 
              onChange={(e) => setData({ ...data, neighborhood: e.target.value })} 
              className="w-full text-2xl border-2 border-transparent bg-white/40 backdrop-blur-md rounded-2xl p-6 focus:outline-none focus:border-terracotta focus:bg-white/80 transition-all placeholder:text-ink/30 shadow-inner" 
            />
            <motion.div variants={itemVariants} className="mt-4">
              <motion.button 
                variants={interactiveItem} initial="rest" whileHover="hover" whileTap="tap" 
                onClick={() => paginate(1)} 
                disabled={!data.neighborhood} 
                className="bg-terracotta text-paper py-4 px-10 rounded-full font-medium text-lg w-fit disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-terracotta/20"
              >
                Continue 
                <span className="text-xl">→</span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}

        {/* STEP 1: Interests */}
        {step === 1 && (
          <motion.div key="step1" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit" className="flex flex-col gap-6 pt-8">
            <motion.h3 variants={itemVariants} className="font-serif text-3xl md:text-4xl leading-tight">
              What’s your ideal weekend vibe?
            </motion.h3>
            
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 mt-2">
              {INTERESTS.map((item) => {
                const isSelected = data.interests.includes(item.id);
                return (
                  <motion.div 
                    key={item.id} 
                    whileHover={{ scale: 1.02 }} 
                    whileTap={{ scale: 0.95 }} 
                    onClick={() => toggleInterest(item.id)} 
                    className={`cursor-pointer p-5 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all duration-300 ${
                      isSelected 
                        ? "border-terracotta bg-terracotta/10 shadow-md" 
                        : "border-sand/60 bg-white/30 hover:bg-white/60 hover:border-sand"
                    }`}
                  >
                    <motion.span 
                      animate={{ scale: isSelected ? 1.2 : 1 }} 
                      transition={springConfig} 
                      className="text-4xl"
                    >
                      {item.icon}
                    </motion.span>
                    <span className={`font-medium ${isSelected ? "text-terracotta" : "text-ink/70"}`}>
                      {item.label}
                    </span>
                  </motion.div>
                )
              })}
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex justify-between items-center mt-6">
              <button onClick={() => paginate(-1)} className="text-ink/50 hover:text-ink transition-colors font-medium px-4 py-2">Back</button>
              <motion.button 
                variants={interactiveItem} initial="rest" whileHover="hover" whileTap="tap" 
                onClick={() => paginate(1)} 
                disabled={data.interests.length === 0} 
                className="bg-terracotta text-paper py-4 px-10 rounded-full font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-terracotta/20"
              >
                Continue 
                <span className="text-xl">→</span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}

        {/* STEP 2: Email */}
        {step === 2 && (
          <motion.div key="step2" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit" className="flex flex-col gap-6 pt-8">
            <motion.h3 variants={itemVariants} className="font-serif text-3xl md:text-4xl leading-tight">
              Let's make it official.
            </motion.h3>
            <motion.p variants={itemVariants} className="text-ink/60 text-lg">
              Drop your email to get an invite to our first batch in {data.neighborhood}.
            </motion.p>
            <motion.input 
              variants={itemVariants}
              type="email" 
              placeholder="hello@example.com" 
              value={data.email} 
              onChange={(e) => setData({ ...data, email: e.target.value })} 
              className="w-full text-2xl border-2 border-transparent bg-white/40 backdrop-blur-md rounded-2xl p-6 focus:outline-none focus:border-forest focus:bg-white/80 transition-all placeholder:text-ink/30 shadow-inner" 
            />
            <motion.div variants={itemVariants} className="flex justify-between items-center mt-6">
              <button onClick={() => paginate(-1)} className="text-ink/50 hover:text-ink transition-colors font-medium px-4 py-2">Back</button>
              <motion.button 
                variants={interactiveItem} initial="rest" whileHover="hover" whileTap="tap" 
                onClick={() => paginate(1)} 
                disabled={!data.email.includes("@")} 
                className="bg-forest text-paper py-4 px-10 rounded-full font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-forest/20"
              >
                Join Waitlist
              </motion.button>
            </motion.div>
          </motion.div>
        )}

        {/* STEP 3: Success */}
        {step === 3 && (
          <motion.div key="step3" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit" className="flex flex-col items-center text-center gap-6 pt-8">
            <motion.div 
              initial={{ scale: 0, rotate: -180 }} 
              animate={{ scale: 1, rotate: 0 }} 
              transition={{ type: "spring", damping: 12, stiffness: 100, delay: 0.2 }}
              className="w-24 h-24 bg-forest/10 border border-forest/20 text-forest rounded-full flex items-center justify-center text-5xl shadow-inner"
            >
              <motion.span 
                animate={{ y: [0, -10, 0] }} 
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              >
                🌿
              </motion.span>
            </motion.div>
            <motion.h3 variants={itemVariants} className="font-serif text-4xl">
              You're on the list!
            </motion.h3>
            <motion.p variants={itemVariants} className="text-ink/70 text-xl leading-relaxed">
              Keep an eye on <b className="text-ink">{data.email}</b>. We’ll be reaching out soon to confirm your first curated experience.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Embedded Animated Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={springConfig}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-ink text-paper px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 z-50 font-medium whitespace-nowrap"
          >
            <div className="w-2 h-2 bg-terracotta rounded-full" />
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
}