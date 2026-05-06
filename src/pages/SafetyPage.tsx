import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer, fadeInUp, springConfig } from "../lib/animations";

const SAFETY_FEATURES = [
  { title: "Public Venues Only", desc: "All official Meet & Greets and Circle events take place in highly-rated public cafes, restaurants, and galleries." },
  { title: "Verified Profiles", desc: "Every member goes through a human review and social verification (LinkedIn/Instagram) before joining a circle." },
  { title: "Dedicated Hosts", desc: "Your first few meetings are lightly facilitated by a vetted community host to ensure a warm, safe environment." }
];

const CODE_OF_CONDUCT = [
  { id: 1, short: "Respect the Vibe", long: "This is a diverse, inclusive community. Hate speech, discrimination, or aggressive conduct of any kind will result in an immediate, unappealable permanent ban." },
  { id: 2, short: "Strictly Platonic", long: "This is not a dating app. Unwanted romantic advances, inappropriate touching, or treating events like a singles-mixer violates our core philosophy and will result in removal." },
  { id: 3, short: "Show Up & Be Present", long: "Small groups rely on participation. Flaking without 24hr notice disrupts the experience for the other 5 people. Repeat no-shows will lose their circle placement." },
  { id: 4, short: "Privacy First", long: "What happens in the circle stays in the circle. Do not share contact information, personal stories, or photos of other members without their explicit, enthusiastic consent." }
];

export default function SafetyPage() {
  const [openId, setOpenId] = useState<number | null>(1); // Open first by default

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D2A26] pt-32 pb-24">
      
      {/* Header */}
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="max-w-4xl mx-auto px-6 text-center mb-24">
        <motion.div variants={fadeInUp} className="w-20 h-20 bg-[#E6EBE6] text-[#2A4B46] rounded-full flex items-center justify-center text-4xl mx-auto mb-8 shadow-inner">
          🛡️
        </motion.div>
        <motion.h1 variants={fadeInUp} className="font-serif text-5xl md:text-6xl mb-6">
          Safe. Curated. Respectful.
        </motion.h1>
        <motion.p variants={fadeInUp} className="text-xl text-ink/70 max-w-2xl mx-auto font-light">
          We are building a community founded on trust. Here is exactly how we protect our members and the vibe of our platform.
        </motion.p>
      </motion.div>

      {/* Safety Protocols Grid */}
      <section className="max-w-6xl mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SAFETY_FEATURES.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-[#EFEBE0] text-center"
            >
              <h3 className="font-serif text-2xl mb-4 text-[#2A4B46]">{feature.title}</h3>
              <p className="text-ink/70">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* The Code of Conduct (Interactive Accordion) */}
      <section className="max-w-4xl mx-auto px-6 bg-white p-8 md:p-16 rounded-[3rem] shadow-tactile border border-[#EFEBE0]">
        <h2 className="font-serif text-4xl mb-2 text-center">The Code of Conduct</h2>
        <p className="text-center text-ink/60 mb-12">By joining a circle, you explicitly agree to these rules.</p>
        
        <div className="flex flex-col gap-4">
          {CODE_OF_CONDUCT.map((rule, idx) => {
            const isOpen = openId === rule.id;
            return (
              <div 
                key={rule.id} 
                className={`border-l-4 rounded-r-2xl transition-colors duration-300 ${isOpen ? 'border-[#E56B55] bg-[#FDFBF7]' : 'border-[#EFEBE0] bg-transparent hover:bg-[#FDFBF7]/50'}`}
              >
                <button 
                  onClick={() => setOpenId(isOpen ? null : rule.id)} 
                  className="w-full text-left p-6 flex items-center justify-between focus:outline-none"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-serif text-2xl text-ink/30">0{idx + 1}</span>
                    <h3 className="font-sans font-medium text-xl md:text-2xl">{rule.short}</h3>
                  </div>
                  <motion.div 
                    animate={{ rotate: isOpen ? 45 : 0 }} 
                    className="text-2xl text-ink/50"
                  >
                    +
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }} 
                      animate={{ height: "auto", opacity: 1 }} 
                      exit={{ height: 0, opacity: 0 }} 
                      transition={springConfig} 
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 pt-2 text-ink/70 leading-relaxed text-lg ml-10">
                        {rule.long}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Reporting Section */}
        <div className="mt-16 bg-[#2D2A26] text-white p-8 rounded-3xl text-center">
          <h3 className="font-serif text-2xl mb-3">See something? Say something.</h3>
          <p className="text-white/70 mb-6">
            We have an anonymous, zero-friction reporting system. If a member violates these rules, they are removed.
          </p>
          <button className="bg-white text-[#2D2A26] px-8 py-3 rounded-full font-medium hover:scale-105 transition-transform">
            View Reporting Process
          </button>
        </div>
      </section>

    </div>
  );
}