import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Code, LogIn, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Início', href: '#home' },
    { name: 'Sobre', href: '#about' },
    { name: 'Serviços', href: '#services' },
    { name: 'Ferramentas', href: '#tools' },
    { name: 'Portfólio', href: '#portfolio' },
    { name: 'Depoimentos', href: '#testimonials' },
    { name: 'Contato', href: '#contact' }
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);

    if (href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsAppClick = () => {
    const message = "Olá! Gostaria de conversar sobre um projeto.";
    const whatsappUrl = `https://wa.me/63992410056?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-md'
          : 'bg-background/20 backdrop-blur-sm border-b border-white/10'
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => handleNavClick('#home')}
              className={`text-xl font-bold transition-colors flex items-center gap-2 ${isScrolled
                  ? 'text-primary hover:text-primary-hover'
                  : 'text-white hover:text-primary-foreground'
                }`}
            >
              <Code className="h-5 w-5" />
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className={`transition-colors font-medium ${isScrolled
                    ? 'text-foreground hover:text-primary'
                    : 'text-white/90 hover:text-white'
                  }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Desktop CTA and Auth */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <Button
                variant="ghost"
                className={`flex items-center gap-1 ${isScrolled
                    ? 'text-foreground hover:text-primary'
                    : 'text-white/90 hover:text-white'
                  }`}
              >
                <LogIn size={16} />
                Login
              </Button>
            </Link>

            <Link to="/register">
              <Button
                variant="outline"
                className={`flex items-center gap-1 ${isScrolled
                    ? 'border-primary text-primary hover:bg-primary/10 bg-background'
                    : 'border-white/80 text-white hover:bg-white/10 bg-white/5 backdrop-blur-sm'
                  }`}
              >
                <UserPlus size={16} />
                Cadastrar
              </Button>
            </Link>


          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 rounded-md transition-colors ${isScrolled
                ? 'hover:bg-muted text-foreground'
                : 'hover:bg-white/10 text-white'
              }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10 bg-background/95 backdrop-blur-md">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="text-left px-4 py-2 text-foreground hover:text-primary hover:bg-muted transition-colors rounded-md"
                >
                  {item.name}
                </button>
              ))}

              {/* Auth Buttons Mobile */}
              <div className="border-t border-white/10 pt-2 mt-2">
                <Link to="/login" className="w-full">
                  <button className="w-full flex items-center gap-2 text-left px-4 py-2 text-foreground hover:text-primary hover:bg-muted transition-colors rounded-md">
                    <LogIn size={16} />
                    Login
                  </button>
                </Link>
                <Link to="/register" className="w-full">
                  <button className="w-full flex items-center gap-2 text-left px-4 py-2 text-foreground hover:text-primary hover:bg-muted transition-colors rounded-md">
                    <UserPlus size={16} />
                    Cadastrar
                  </button>
                </Link>
              </div>

              <div className="pt-4 px-4">
                <Button
                  onClick={handleWhatsAppClick}
                  className="btn-primary w-full"
                >
                  Vamos conversar
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}