import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { staggerContainer, fadeInUp, springConfig } from "../lib/animations";

const PILLARS = [
  { title: "No Algorithms", desc: "We don't use infinite swiping. We match you based on values, communication styles, and energy levels.", icon: "🧭" },
  { title: "Small Groups Only", desc: "Large networking events are overwhelming. We cap circles at 5-8 people to ensure everyone is heard.", icon: "🌿" },
  { title: "Offline First", desc: "The app is just a tool to get you to the table. The real magic happens over coffee, walks, and shared meals.", icon: "☕️" },
  { title: "Not a Dating App", desc: "This space is strictly for platonic connection. Zero pressure, zero weirdness. Just genuine friendship.", icon: "🤝" }
];

// Curated high-quality images for the automated slider
const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1000&auto=format&fit=crop",
];

// Duplicate for a seamless infinite loop
const INFINITE_GALLERY = [...GALLERY_IMAGES, ...GALLERY_IMAGES];

export default function PhilosophyPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Slight parallax effect for the entire page background elements
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div ref={containerRef} className="min-h-screen bg-paper text-ink pt-32 pb-32 overflow-hidden relative">
      
      {/* Background Decorative Elements */}
      <motion.div style={{ y: yParallax }} className="absolute top-20 left-10 w-96 h-96 bg-sand/30 rounded-full blur-3xl -z-10" />
      <motion.div style={{ y: yParallax }} className="absolute bottom-40 right-10 w-[500px] h-[500px] bg-terracotta/5 rounded-full blur-3xl -z-10" />

      {/* 1. Hero Section */}
      <section className="max-w-5xl mx-auto px-6 text-center mb-24 md:mb-32">
        <motion.div variants={staggerContainer} initial="hidden" animate="show">
          <motion.div variants={fadeInUp} className="text-terracotta font-medium tracking-widest uppercase mb-6 flex items-center justify-center gap-3">
            <span className="w-8 h-[2px] bg-terracotta" />
            Our Philosophy
            <span className="w-8 h-[2px] bg-terracotta" />
          </motion.div>
          <motion.h1 variants={fadeInUp} className="font-serif text-5xl md:text-7xl lg:text-8xl mb-8 leading-[1.1] text-ink">
            Making friends shouldn't <br className="hidden md:block"/> feel like a second job.
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-xl md:text-2xl font-light text-ink/70 leading-relaxed max-w-3xl mx-auto">
            You moved to a new city, changed careers, or started working remotely. Suddenly, the organic social circles of your 20s are gone. We're here to rebuild them.
          </motion.p>
        </motion.div>
      </section>

      {/* 2. Automated Infinite Image Slider */}
      <section className="w-full mb-32 relative py-10">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-paper to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-paper to-transparent z-10" />
        
        <div className="flex overflow-hidden">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 40, repeat: Infinity }}
            className="flex gap-6 px-6 w-max cursor-grab active:cursor-grabbing"
          >
            {INFINITE_GALLERY.map((src, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.02, rotate: i % 2 === 0 ? 1 : -1 }}
                transition={springConfig}
                className="w-[280px] h-[400px] md:w-[400px] md:h-[550px] rounded-[3rem] overflow-hidden flex-shrink-0 shadow-tactile relative group"
              >
                <img src={src} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Authentic friendship moment" />
                <div className="absolute inset-0 bg-ink/10 group-hover:bg-transparent transition-colors duration-500" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. The 4 Pillars (Sticky Editorial Layout) */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative items-start">
          
          {/* Sticky Left Column */}
          <div className="lg:col-span-5 lg:sticky top-32">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="font-serif text-5xl md:text-6xl leading-tight mb-8">More than <br/> small talk.</h2>
              <p className="text-xl text-ink/70 font-light leading-relaxed mb-8">
                We realized existing apps either focus on romance, or throw you into massive 50-person meetups where you barely remember anyone's name. 
              </p>
              <p className="text-xl text-ink/70 font-light leading-relaxed">
                We designed a slower, more intentional way to connect. Real humans. Real places. Real conversations.
              </p>
            </motion.div>
          </div>
          
          {/* Interactive Right Column Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {PILLARS.map((pillar, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -10, scale: 1.02, backgroundColor: "rgba(239, 235, 224, 0.6)" }} // Interactive Lift
                transition={{ ...springConfig, delay: i * 0.1 }}
                className="bg-sand/20 p-10 rounded-[2.5rem] border border-sand shadow-sm hover:shadow-tactile-hover transition-all duration-300 group cursor-default"
              >
                <motion.div 
                  className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl mb-6 shadow-sm border border-sand group-hover:border-terracotta/30 transition-colors"
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  {pillar.icon}
                </motion.div>
                <h3 className="font-serif text-2xl mb-4 text-ink">{pillar.title}</h3>
                <p className="text-ink/70 text-base leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}