import { motion } from "framer-motion";
import { springConfig, staggerContainer, fadeInUp, interactiveItem } from "../lib/animations";

const JOURNEY_STEPS = [
  { step: "01", title: "The Meet & Greet", desc: "Start with a low-pressure, $25 public gathering. See if the vibe is right before committing to a full circle." },
  { step: "02", title: "The 4-Week Circle", desc: "Join 5-8 people for a curated monthly journey. Coffee, guided activities, and deep conversations." },
  { step: "03", title: "The Alumni Club", desc: "Keep the connection going. Access larger monthly events and our private city-wide community." }
];

export default function MembershipPage() {
  return (
    <div className="min-h-screen bg-paper text-ink pt-32 pb-24 overflow-x-hidden">
      
      {/* Header */}
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="max-w-4xl mx-auto px-6 text-center mb-24">
        <motion.h1 variants={fadeInUp} className="font-serif text-5xl md:text-7xl mb-6 leading-tight">
          A membership built for <br/><span className="italic text-terracotta">meaningful connection.</span>
        </motion.h1>
        <motion.p variants={fadeInUp} className="text-xl text-ink/70 max-w-2xl mx-auto font-light">
          No subscriptions to swipe. You only pay for real, curated offline experiences. Choose the journey that fits your pace.
        </motion.p>
      </motion.div>

      {/* The Journey Timeline */}
      <section className="max-w-6xl mx-auto px-6 mb-32 relative">
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-sand -z-10 rounded-full" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {JOURNEY_STEPS.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ ...springConfig, delay: idx * 0.2 }}
              className="bg-white p-10 rounded-[2.5rem] shadow-tactile border border-sand relative"
            >
              <div className="w-16 h-16 bg-terracotta text-paper rounded-full flex items-center justify-center font-serif text-2xl mb-6 shadow-md">
                {item.step}
              </div>
              <h3 className="font-serif text-2xl mb-4">{item.title}</h3>
              <p className="text-ink/70 leading-relaxed text-lg">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl">Transparent Pricing</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
          
          {/* Card 1: Meet & Greet */}
          <motion.div variants={interactiveItem} initial="rest" whileHover="hover" className="bg-sand/30 p-10 rounded-[3rem] border border-sand">
            <h3 className="font-serif text-2xl mb-2">Meet & Greet</h3>
            <p className="text-ink/60 mb-8 min-h-[50px]">The perfect low-pressure starting point.</p>
            <div className="text-5xl font-serif mb-8">$25<span className="text-xl text-ink/50 font-sans">/event</span></div>
            <ul className="flex flex-col gap-4 mb-10 text-ink/80">
              <li className="flex items-center gap-3"><span>☕️</span> 1 Curated Coffee Meetup</li>
              <li className="flex items-center gap-3"><span>🤝</span> 6-10 Verified Locals</li>
              <li className="flex items-center gap-3"><span>🔄</span> Easy $25 Re-match Option</li>
            </ul>
            <button className="w-full py-4 rounded-full border-2 border-ink text-ink font-medium hover:bg-ink hover:text-paper transition-colors">Find a Meetup</button>
          </motion.div>

          {/* Card 2: Core Circle (Highlighted) */}
          <motion.div variants={interactiveItem} initial="rest" whileHover="hover" className="bg-forest text-paper p-12 rounded-[3rem] shadow-2xl relative z-10 -translate-y-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-terracotta text-paper px-6 py-2 rounded-full text-sm font-medium uppercase tracking-widest shadow-md">
              The Core Journey
            </div>
            <h3 className="font-serif text-3xl mb-2">Friendship Circle</h3>
            <p className="text-paper/70 mb-8 min-h-[50px]">A 4-week guided journey to lasting friendships.</p>
            <div className="text-6xl font-serif mb-8">$129<span className="text-xl text-paper/50 font-sans">/circle</span></div>
            <ul className="flex flex-col gap-4 mb-10 text-paper/90">
              <li className="flex items-center gap-3"><span>🗓️</span> 4 Weekly Curated Events</li>
              <li className="flex items-center gap-3"><span>🎯</span> 5-8 Deeply Matched People</li>
              <li className="flex items-center gap-3"><span>💬</span> Guided Conversation Prompts</li>
              <li className="flex items-center gap-3"><span>📱</span> Private Circle Group Chat</li>
            </ul>
            <button className="w-full py-4 rounded-full bg-terracotta text-paper font-medium text-lg shadow-lg hover:shadow-xl transition-all">Apply for a Circle</button>
          </motion.div>

          {/* Card 3: Alumni */}
          <motion.div variants={interactiveItem} initial="rest" whileHover="hover" className="bg-sand/30 p-10 rounded-[3rem] border border-sand">
            <h3 className="font-serif text-2xl mb-2">Alumni Club</h3>
            <p className="text-ink/60 mb-8 min-h-[50px]">For graduates of a Friendship Circle.</p>
            <div className="text-5xl font-serif mb-8">$19<span className="text-xl text-ink/50 font-sans">/month</span></div>
            <ul className="flex flex-col gap-4 mb-10 text-ink/80">
              <li className="flex items-center gap-3"><span>🎟️</span> Priority Access to Events</li>
              <li className="flex items-center gap-3"><span>🌐</span> City-Wide Community Chat</li>
              <li className="flex items-center gap-3"><span>💸</span> Discounts on Workshops</li>
            </ul>
            <button className="w-full py-4 rounded-full border-2 border-ink text-ink font-medium hover:bg-ink hover:text-paper transition-colors">Join the Club</button>
          </motion.div>

        </div>
      </section>
    </div>
  );
}