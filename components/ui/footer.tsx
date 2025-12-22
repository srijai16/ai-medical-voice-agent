import { Facebook, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Left side - Copyright */}
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} — MediVoice AI. All rights reserved
          </p>

          {/* Center - Social Icons */}
          <div className="flex items-center gap-3">
            <a href="#" aria-label="Facebook" className="inline-flex items-center justify-center w-7 h-7 rounded-full hover:bg-accent/10 transition-colors text-muted-foreground hover:text-primary">
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a href="#" aria-label="Twitter" className="inline-flex items-center justify-center w-7 h-7 rounded-full hover:bg-accent/10 transition-colors text-muted-foreground hover:text-primary">
              <Twitter className="w-3.5 h-3.5" />
            </a>
            <a href="#" aria-label="LinkedIn" className="inline-flex items-center justify-center w-7 h-7 rounded-full hover:bg-accent/10 transition-colors text-muted-foreground hover:text-primary">
              <Linkedin className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Right side - Made with love */}
          <p className="text-sm text-muted-foreground">
            Made with <span className="text-destructive">❤️</span> by Srijai
          </p>
        </div>
      </div>
    </footer>
  );
}