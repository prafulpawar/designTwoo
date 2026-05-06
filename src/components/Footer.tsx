import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-ink text-paper py-16 px-6 rounded-t-[3rem]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h2 className="font-serif text-3xl mb-4">The Local Club</h2>
          <p className="text-paper/60 font-light">Real friends. Real life.</p>
        </div>
        <div className="flex flex-col gap-3 font-light text-paper/80">
          <Link to="/about" className="hover:text-terracotta w-fit transition-colors">About Us</Link>
          <Link to="/faq" className="hover:text-terracotta w-fit transition-colors">FAQ</Link>
          <Link to="/contact" className="hover:text-terracotta w-fit transition-colors">Contact</Link>
        </div>
        <div className="flex flex-col gap-3 font-light text-paper/80">
          <Link to="/privacy" className="hover:text-terracotta w-fit transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-terracotta w-fit transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}