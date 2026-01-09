import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: "HOME", href: "#home" },
    { name: "ABOUT", href: "#about" },
    { name: "PROJECTS", href: "#projects" },
    { name: "CONTACT", href: "#contact" },
  ];

  return (
    <footer className="bg-pokemon-dark border-t-4 border-pokemon-red">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-pokemon-red rounded-full border-2 border-pokemon-cream flex items-center justify-center">
              <span className="text-sm">⚡</span>
            </div>
            <span className="text-pokemon-yellow font-bold tracking-wider pokemon-text">
              TRAINER.IO
            </span>
          </div>

          {/* Copyright */}
          <div className="text-pokemon-cream/60 text-sm">
            © {currentYear} TRAINER.IO | ALL RIGHTS RESERVED
          </div>

          {/* Quick Links */}
          <div className="flex gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-pokemon-cream/60 hover:text-pokemon-yellow text-sm transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 pt-4 border-t border-pokemon-cream/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-pokemon-cream/40">
          <div>
            MADE WITH ⚡ USING NEXT.JS & TAILWIND CSS
          </div>
          <div className="flex gap-4">
            <span>🎮</span>
            <span>⚡</span>
            <span>🎨</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
