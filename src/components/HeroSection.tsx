import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";
import heroImage from "@/assets/hero-profile.jpg";

export default function HeroSection() {
  const handleWhatsAppClick = () => {
    const message = "Olá! Gostaria de conversar sobre um projeto.";
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="home" className="hero-gradient min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center md:text-left animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Erick <span className="text-gradient">Vinícius</span>
            </h1>
            <h2 className="text-2xl md:text-3xl text-white/90 mb-6 font-medium">
              Analista Sênior Fullstack
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl">
              Transformo suas ideias em soluções digitais robustas e escaláveis. 
              Especialista em desenvolvimento completo com foco em resultados que geram valor real para o seu negócio.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button 
                size="lg"
                onClick={handleWhatsAppClick}
                className="btn-primary group"
              >
                Vamos conversar
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <Button 
                variant="outline"
                size="lg"
                className="btn-secondary"
              >
                <Download className="mr-2 h-5 w-5" />
                Download CV
              </Button>
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex justify-center md:justify-end animate-scale-in">
            <div className="relative">
              <div className="w-80 h-80 rounded-full overflow-hidden border-4 border-white/20 shadow-[var(--shadow-large)]">
                <img 
                  src={heroImage} 
                  alt="Erick Vinícius - Analista Sênior Fullstack"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <span className="text-white font-medium">5+ anos</span>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <span className="text-white font-medium">50+ projetos</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
}