import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { springConfig, staggerContainer, fadeInUp } from "../lib/animations";

const PRIVACY_RULES = [
  { id: 1, short: "We protect your data.", long: "We only collect data necessary to match you with relevant local groups. We never sell your personal information to third-party data brokers or advertisers." },
  { id: 2, short: "You control your visibility.", long: "Your profile is only shared with the 4-6 people in your confirmed group 24 hours before an event. Otherwise, you remain completely private." }
];

const TERMS_RULES = [
  { id: 1, short: "Respect the vibe.", long: "Hate speech, harassment, or treating this platform like a dating app will result in an immediate, unappealable permanent ban." },
  { id: 2, short: "Show up.", long: "If you RSVP to a small-group event, others are counting on you. Flaking without 24hr notice disrupts the experience and may restrict your account." }
];

export default function LegalPage({ type }: { type: "Privacy" | "Terms" }) {
  const rules = type === "Privacy" ? PRIVACY_RULES : TERMS_RULES;
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto px-6 py-32 min-h-screen">
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="mb-16">
        <motion.h1 variants={fadeInUp} className="font-serif text-5xl mb-6">{type === "Privacy" ? "Privacy Policy" : "Terms of Service"}</motion.h1>
        <motion.p variants={fadeInUp} className="text-xl text-ink/60">Plain English over legal jargon. Here are our golden rules.</motion.p>
      </motion.div>

      <div className="flex flex-col gap-6">
        {rules.map((rule, idx) => (
          <div key={rule.id} className="border-l-4 border-terracotta pl-6 py-2 cursor-pointer" onClick={() => setOpenId(openId === rule.id ? null : rule.id)}>
            <div className="flex items-center gap-4">
              <span className="font-serif text-3xl text-ink/30">0{idx + 1}</span>
              <h3 className="font-sans font-medium text-2xl">{rule.short}</h3>
            </div>
            <AnimatePresence>
              {openId === rule.id && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={springConfig as any} className="overflow-hidden">
                  <p className="mt-4 text-ink/70 leading-relaxed text-lg bg-sand/20 p-6 rounded-2xl">{rule.long}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      <div className="mt-20 pt-8 border-t border-sand text-sm text-ink/40">
        * Standard legal boilerplate goes here for compliance, but the human-readable summary above governs our core philosophy.
      </div>
    </div>
  );
}