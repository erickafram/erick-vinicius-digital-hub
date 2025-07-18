import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";
import heroImage from "@/assets/hero-profile.jpg";

export default function HeroSection() {
  const handleWhatsAppClick = () => {
    const message = "Olá! Gostaria de conversar sobre um projeto.";
    const whatsappUrl = `https://wa.me/63992410056?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="home" className="hero-gradient min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-4 md:left-10 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-4 md:right-20 w-1 h-1 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-4 md:left-20 w-1.5 h-1.5 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-60 left-1/3 w-1 h-1 bg-white/50 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-20 right-1/4 w-2 h-2 bg-white/25 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>

        {/* Geometric shapes - hidden on mobile */}
        <div className="hidden md:block absolute top-32 right-40 w-12 h-12 border border-white/10 rotate-45 animate-pulse"></div>
        <div className="hidden md:block absolute bottom-32 left-40 w-8 h-8 border border-white/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Clean dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80"></div>

      {/* Subtle glowing lines */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent animate-pulse"></div>
        <div className="absolute top-2/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/25 to-transparent animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center md:text-left animate-fade-in">
            <div className="mb-3 sm:mb-4">
              <div className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-3 sm:mb-4">
                <span className="text-white/90 text-xs sm:text-sm font-medium">�‍v💻👨‍💻 Desenvolvedor Full Stack</span>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white/90 mb-4 sm:mb-6 md:mb-8 font-medium leading-tight">
              <span className="text-gradient bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">Analista Sênior</span> Fullstack
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 mb-4 sm:mb-6 md:mb-8 max-w-3xl leading-relaxed px-2 md:px-0">
              Transformo suas <span className="text-cyan-300 font-semibold">ideias</span> em soluções digitais
              <span className="text-blue-300 font-semibold"> robustas</span> e <span className="text-purple-300 font-semibold">escaláveis</span>.
              Especialista em desenvolvimento completo com foco em <span className="text-green-300 font-semibold">resultados</span> que geram valor real.
            </p>

            {/* Tech stack indicators */}
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8 justify-center md:justify-start">
              <div className="px-2 py-1 sm:px-3 sm:py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <span className="text-white/90 text-xs sm:text-sm">⚡ React</span>
              </div>
              <div className="px-2 py-1 sm:px-3 sm:py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <span className="text-white/90 text-xs sm:text-sm">🚀 Laravel</span>
              </div>
              <div className="px-2 py-1 sm:px-3 sm:py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <span className="text-white/90 text-xs sm:text-sm">📱 Mobile</span>
              </div>
              <div className="px-2 py-1 sm:px-3 sm:py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <span className="text-white/90 text-xs sm:text-sm">☁️ Cloud</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button
                size="lg"
                onClick={handleWhatsAppClick}
                className="btn-primary group"
              >
                Vamos conversar
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>


            </div>
          </div>

          {/* Profile Image */}
          <div className="flex justify-center md:justify-end animate-scale-in mt-8 md:mt-0">
            <div className="relative">
              {/* Glowing ring animation */}
              <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full animate-pulse"></div>
              <div className="absolute -inset-1 md:-inset-2 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>

              <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white/30 shadow-[var(--shadow-large)] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm">
                <img
                  src={heroImage}
                  alt="Erick Vinícius - Analista Sênior Fullstack"
                  className="w-full h-full object-cover"
                />

                {/* Tech overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Enhanced floating badges - responsive positioning */}
              <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 md:-top-6 md:-right-6 bg-gradient-to-r from-blue-500/90 to-purple-500/90 backdrop-blur-sm rounded-full px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 border border-white/20 shadow-lg">
                <span className="text-white font-semibold text-xs sm:text-sm">🚀 15+ anos</span>
              </div>

              <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 md:-bottom-6 md:-left-6 bg-gradient-to-r from-cyan-500/90 to-blue-500/90 backdrop-blur-sm rounded-full px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 border border-white/20 shadow-lg">
                <span className="text-white font-semibold text-xs sm:text-sm">⭐ 50+ projetos</span>
              </div>

              {/* New floating badge - responsive positioning */}
              <div className="absolute top-8 -left-4 sm:top-10 sm:-left-6 md:top-10 md:-left-8 bg-gradient-to-r from-green-500/90 to-teal-500/90 backdrop-blur-sm rounded-full px-2 py-1 sm:px-3 sm:py-1 md:px-3 md:py-1 border border-white/20 shadow-lg">
                <span className="text-white font-medium text-xs">💡 Inovador</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center bg-white/5 backdrop-blur-sm">
            <div className="w-1 h-3 bg-gradient-to-b from-cyan-400 to-blue-400 rounded-full mt-2 animate-pulse"></div>
          </div>
          <span className="text-white/60 text-xs mt-2 font-medium">Role para baixo</span>
        </div>
      </div>
    </section>
  );
}