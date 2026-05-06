import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <nav className="absolute top-0 w-full z-50 px-6 py-6 flex justify-between items-center bg-transparent">
      <Link to="/" className="font-serif font-bold text-2xl tracking-tight">The Local Club</Link>
      <div className="hidden md:flex gap-8 items-center font-medium">
        <Link to="/about" className="hover:text-terracotta transition-colors">Story</Link>
        <Link to="/faq" className="hover:text-terracotta transition-colors">FAQ</Link>
        <Link to="/waitlist">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-ink text-paper px-6 py-2 rounded-full">
            Join Waitlist
          </motion.button>
        </Link>
      </div>
    </nav>
  );
}