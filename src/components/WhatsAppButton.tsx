import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const handleWhatsAppClick = () => {
    const message = "Olá! Gostaria de conversar sobre um projeto.";
    const whatsappUrl = `https://wa.me/63992410056?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="whatsapp-float group"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
      
      {/* Tooltip */}
      <div className="absolute right-16 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap">
          Falar no WhatsApp
          <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
        </div>
      </div>

      {/* Pulse animation */}
      <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></div>
    </button>
  );
}