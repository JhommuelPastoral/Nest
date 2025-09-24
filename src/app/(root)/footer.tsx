import { Heart, Twitter, Github, Mail } from 'lucide-react';
export default function Footer() {
  return (
    <footer className="px-4 py-16 bg-foreground text-primary-foreground">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-flow-col grid-cols-2 grid-rows-2 gap-8 mb-12 md:grid-cols-3 md:grid-rows-1">
          {/* Logo & Description */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center mb-4">
              <h3 className="text-2xl font-bold">Nest</h3>
              <Heart className="w-5 h-5 ml-2 text-sage" />
            </div>
            <p className="max-w-md leading-relaxed text-primary-foreground/80">
              A sanctuary for your thoughts. Keep your story safe, private, and beautifully organized in your personal Nest.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-semibold">Product</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#" className="transition-colors hover:text-sage">Features</a></li>
              <li><a href="#" className="transition-colors hover:text-sage">Privacy</a></li>
              <li><a href="#" className="transition-colors hover:text-sage">Security</a></li>
              <li><a href="#" className="transition-colors hover:text-sage">Pricing</a></li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="mb-4 font-semibold">Support</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#" className="transition-colors hover:text-sage">Help Center</a></li>
              <li><a href="#" className="transition-colors hover:text-sage">Contact Us</a></li>
              <li><a href="#" className="transition-colors hover:text-sage">Community</a></li>
              <li><a href="#" className="transition-colors hover:text-sage">Blog</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between pt-8 border-t border-primary-foreground/20 md:flex-row">
          <div className="mb-4 text-sm text-primary-foreground/60 md:mb-0">
            © 2025 Nest. Made with care for mindful journaling.
          </div>
          
          {/* Social Links */}
          <div className="flex space-x-4">
            <a href="#" className="transition-colors text-primary-foreground/60 hover:text-sage">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="transition-colors text-primary-foreground/60 hover:text-sage">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="transition-colors text-primary-foreground/60 hover:text-sage">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>  
    );
}