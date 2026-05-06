import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer, fadeInUp, springConfig } from "../lib/animations";

const FAQS = [
  { id: "1", q: "Is this a dating app?", a: "No. This is strictly for platonic, meaningful adult friendships. We enforce a 'Respect the Vibe' policy.", color: "bg-[#F3EBE1]" },
  { id: "2", q: "How big are the groups?", a: "We cap experiences at 4-6 people to ensure everyone can actually participate in the conversation.", color: "bg-[#E6EBE6]" },
  { id: "3", q: "Who pays for the activities?", a: "You pay for your own food/drinks/tickets at the venue. Our platform charges a small curation fee to organize the logistics.", color: "bg-[#EBEAF0]" },
];

export default function FAQPage() {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = FAQS.filter(f => f.q.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-5xl mx-auto px-6 py-32 min-h-screen">
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="text-center mb-16">
        <motion.h1 variants={fadeInUp} className="font-serif text-5xl mb-6">How can we help?</motion.h1>
        <motion.input variants={fadeInUp} type="text" placeholder="Search questions..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full max-w-xl text-xl p-4 rounded-2xl border-2 border-sand bg-transparent focus:border-forest outline-none shadow-sm transition-all" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
        <AnimatePresence>
          {filtered.map(faq => (
            <motion.div key={faq.id} layoutId={faq.id} onClick={() => setSelectedId(faq.id)} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} whileHover={{ scale: 1.03 }} className={`cursor-pointer p-8 rounded-3xl shadow-sm ${faq.color} flex items-center justify-center text-center min-h-[200px]`}>
              <h3 className="font-serif text-xl font-medium">{faq.q}</h3>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-ink/20 backdrop-blur-sm" onClick={() => setSelectedId(null)}>
            <motion.div layoutId={selectedId} className="bg-paper p-10 rounded-3xl w-full max-w-lg shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
              {FAQS.filter(f => f.id === selectedId).map(faq => (
                <div key="content">
                  <h3 className="font-serif text-3xl mb-4">{faq.q}</h3>
                  <p className="text-lg text-ink/70 leading-relaxed">{faq.a}</p>
                  <button onClick={() => setSelectedId(null)} className="mt-8 bg-ink text-paper px-6 py-2 rounded-full">Close</button>
                </div>
              ))}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}