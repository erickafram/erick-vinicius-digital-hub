import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simular envio do formulário
    toast.success("Mensagem enviada com sucesso! Responderemos em breve.");

    // Limpar formulário
    setFormData({ name: '', email: '', message: '' });
  };

  const handleWhatsAppClick = () => {
    const message = `Olá! Meu nome é ${formData.name || '[Nome]'} e gostaria de conversar sobre um projeto.`;
    const whatsappUrl = `https://wa.me/63992410056?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: " portifolio",
      href: "mailto:erickafram08@gmail.com"
    },
    {
      icon: Phone,
      label: "WhatsApp",
      value: "+55 (63) 99241-0056",
      href: "https://wa.me/63992410056"
    },
    {
      icon: MapPin,
      label: "Localização",
      value: "Palmas, TO - Brasil",
      href: null
    }
  ];

  return (
    <section id="contact" className="section-padding bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4">
            Entre em <span className="text-gradient">Contato</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Pronto para transformar sua ideia em realidade? Vamos conversar sobre seu projeto!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="border-0 shadow-[var(--shadow-soft)] bg-background/80 backdrop-blur-sm animate-slide-up">
            <CardHeader>
              <CardTitle className="text-2xl">Envie uma mensagem</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <Input
                    id="name"
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea
                    id="message"
                    placeholder="Conte-me sobre seu projeto..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>

                <div className="flex gap-3">
                  <Button type="submit" className="flex-1 btn-primary">
                    <Send className="h-4 w-4 mr-2" />
                    Enviar mensagem
                  </Button>
                  <Button
                    type="button"
                    onClick={handleWhatsAppClick}
                    className="btn-secondary"
                  >
                    WhatsApp
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6 animate-fade-in">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Vamos conversar</h3>
              <p className="text-muted-foreground mb-8">
                Estou sempre disponível para discutir novos projetos e oportunidades.
                Entre em contato através dos canais abaixo ou use o formulário ao lado.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <Card key={index} className="border-0 shadow-[var(--shadow-soft)] bg-background/80 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <info.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{info.label}</div>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-muted-foreground hover:text-primary transition-colors"
                            target={info.href.startsWith('http') ? '_blank' : undefined}
                          >
                            {info.value}
                          </a>
                        ) : (
                          <div className="text-muted-foreground">{info.value}</div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-0 shadow-[var(--shadow-soft)] bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-2">Resposta rápida</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Precisa de uma resposta imediata? Entre em contato pelo WhatsApp
                  e receba retorno em até 1 hora durante o horário comercial.
                </p>
                <Button
                  onClick={handleWhatsAppClick}
                  className="btn-primary w-full"
                >
                  Conversar no WhatsApp
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}