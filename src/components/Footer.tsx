import { Code, Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-4">Erick Vinícius</h3>
            <p className="text-primary-foreground/80 mb-4">
              Analista Sênior Fullstack especializado em criar soluções digitais 
              que fazem a diferença no seu negócio.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-primary-foreground/20 transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-primary-foreground/20 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="mailto:contato@erickvinicius.dev"
                className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-primary-foreground/20 transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Serviços</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>Desenvolvimento PHP</li>
              <li>Aplicativos Android</li>
              <li>Landing Pages</li>
              <li>Desenvolvimento Fullstack</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>
                <a href="mailto:contato@erickvinicius.dev" className="hover:text-primary-foreground transition-colors">
                  contato@erickvinicius.dev
                </a>
              </li>
              <li>
                <a href="https://wa.me/5511999999999" className="hover:text-primary-foreground transition-colors">
                  +55 (11) 99999-9999
                </a>
              </li>
              <li>São Paulo, SP - Brasil</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/80">
          <p className="flex items-center justify-center gap-2">
            Desenvolvido com <Code className="h-4 w-4" /> por Erick Vinícius
          </p>
          <p className="mt-2 text-sm">
            © {currentYear} Erick Vinícius. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}