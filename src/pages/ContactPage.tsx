import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { springConfig, staggerContainer, fadeInUp, interactiveItem } from "../lib/animations";

// 1. Separate the available options from the nullable state
type IntentOption = "Support" | "Partner" | "Feedback";
type IntentState = IntentOption | null;

export default function ContactPage() {
  // 2. State can still be null
  const [intent, setIntent] = useState<IntentState>(null);

  // 3. The array of options strictly contains the strings
  const intents: IntentOption[] = ["Support", "Partner", "Feedback"];

  return (
    <div className="max-w-4xl mx-auto px-6 py-32 min-h-screen">
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="text-center mb-16">
        <motion.div variants={fadeInUp} className="flex justify-center -space-x-4 mb-6">
           <img src="https://i.pravatar.cc/100?img=1" className="w-16 h-16 rounded-full border-4 border-paper shadow-sm" alt="Team" />
           <img src="https://i.pravatar.cc/100?img=2" className="w-16 h-16 rounded-full border-4 border-paper shadow-sm" alt="Team" />
           <img src="https://i.pravatar.cc/100?img=3" className="w-16 h-16 rounded-full border-4 border-paper shadow-sm" alt="Team" />
        </motion.div>
        <motion.h1 variants={fadeInUp} className="font-serif text-5xl mb-4">Let's chat.</motion.h1>
        <motion.p variants={fadeInUp} className="text-xl text-ink/60">What do you need help with?</motion.p>
      </motion.div>

      <div className="flex flex-col gap-4 max-w-2xl mx-auto">
        {intents.map(type => (
          <div key={type} className="bg-white rounded-3xl shadow-sm border border-sand overflow-hidden">
            <motion.button onClick={() => setIntent(intent === type ? null : type)} className="w-full p-6 text-left font-serif text-2xl flex justify-between items-center bg-sand/20 hover:bg-sand/40 transition-colors">
              {type === "Support" && "I have a question about my group"}
              {type === "Partner" && "I want to host an experience"}
              {type === "Feedback" && "I have a suggestion"}
              <span className="text-terracotta">{intent === type ? "−" : "+"}</span>
            </motion.button>
            
            <AnimatePresence>
              {intent === type && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={springConfig}>
                  <form className="p-6 flex flex-col gap-4 border-t border-sand" onSubmit={(e) => e.preventDefault()}>
                    <input type="email" placeholder="Your Email" className="p-4 rounded-xl bg-paper border border-sand focus:border-forest outline-none" required />
                    
                    {/* TS now knows 'type' will never be null here */}
                    <textarea placeholder={`Tell us about your ${type.toLowerCase()}...`} rows={4} className="p-4 rounded-xl bg-paper border border-sand focus:border-forest outline-none resize-none" required />
                    
                    <motion.button variants={interactiveItem} whileHover="hover" whileTap="tap" className="bg-forest text-paper py-3 px-8 rounded-full font-medium w-fit">Send Message</motion.button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}