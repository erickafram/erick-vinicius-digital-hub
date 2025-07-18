import tkinter as tk
from tkinter import ttk, scrolledtext, messagebox
import pyautogui
import time
import threading
from threading import Event
import random
import re

class CodeTyper:
    def __init__(self, root):
        self.root = root
        self.root.title("Simulador de Digitação de Código")
        self.root.geometry("600x500")
        
        # Configurações
        self.typing_speed = tk.DoubleVar(value=0.02)  # Delay mais rápido por padrão
        self.countdown_time = tk.IntVar(value=3)  # Tempo de countdown
        self.human_mode = tk.BooleanVar(value=True)  # Simulação humana
        self.mistake_chance = tk.DoubleVar(value=0.03)  # Chance de erro (3%)
        self.use_spaces = tk.BooleanVar(value=True)  # Usar espaços em vez de tabs
        self.is_typing = False
        self.stop_event = Event()
        
        # Desabilitar o failsafe do pyautogui (opcional)
        pyautogui.FAILSAFE = True
        
        self.setup_ui()
    
    def setup_ui(self):
        # Frame principal
        main_frame = ttk.Frame(self.root, padding="10")
        main_frame.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))
        
        # Configurar grid weights
        self.root.columnconfigure(0, weight=1)
        self.root.rowconfigure(0, weight=1)
        main_frame.columnconfigure(1, weight=1)
        main_frame.rowconfigure(1, weight=1)
        
        # Título
        title_label = ttk.Label(main_frame, text="Simulador de Digitação de Código", 
                               font=("Arial", 14, "bold"))
        title_label.grid(row=0, column=0, columnspan=3, pady=(0, 10))
        
        # Área de texto para o código
        code_label = ttk.Label(main_frame, text="Cole o código que deseja digitar:")
        code_label.grid(row=1, column=0, columnspan=3, sticky=tk.W, pady=(0, 5))
        
        self.code_text = scrolledtext.ScrolledText(main_frame, height=15, width=70)
        self.code_text.grid(row=2, column=0, columnspan=3, sticky=(tk.W, tk.E, tk.N, tk.S), pady=(0, 10))
        
        # Frame de controles
        controls_frame = ttk.Frame(main_frame)
        controls_frame.grid(row=3, column=0, columnspan=3, sticky=(tk.W, tk.E), pady=(0, 10))
        controls_frame.columnconfigure(1, weight=1)
        
        # Velocidade de digitação
        speed_label = ttk.Label(controls_frame, text="Velocidade (segundos por caractere):")
        speed_label.grid(row=0, column=0, sticky=tk.W, padx=(0, 10))
        
        speed_scale = ttk.Scale(controls_frame, from_=0.005, to=0.2, 
                               variable=self.typing_speed, orient=tk.HORIZONTAL)
        speed_scale.grid(row=0, column=1, sticky=(tk.W, tk.E), padx=(0, 10))
        
        speed_value_label = ttk.Label(controls_frame, text="0.02s")
        speed_value_label.grid(row=0, column=2)
        
        # Atualizar label da velocidade
        def update_speed_label(*args):
            speed_value_label.config(text=f"{self.typing_speed.get():.2f}s")
        
        self.typing_speed.trace('w', update_speed_label)
        
        # Tempo de countdown
        countdown_label = ttk.Label(controls_frame, text="Countdown (segundos):")
        countdown_label.grid(row=1, column=0, sticky=tk.W, padx=(0, 10), pady=(10, 0))
        
        countdown_spinbox = ttk.Spinbox(controls_frame, from_=1, to=10, 
                                       textvariable=self.countdown_time, width=5)
        countdown_spinbox.grid(row=1, column=1, sticky=tk.W, pady=(10, 0))
        
        # Simulação humana
        human_check = ttk.Checkbutton(controls_frame, text="Simulação Humana", 
                                     variable=self.human_mode)
        human_check.grid(row=2, column=0, columnspan=2, sticky=tk.W, pady=(10, 0))
        
        # Chance de erro (só aparece se simulação humana estiver ativa)
        mistake_label = ttk.Label(controls_frame, text="Chance de erro (%):")
        mistake_label.grid(row=3, column=0, sticky=tk.W, padx=(0, 10), pady=(5, 0))
        
        mistake_scale = ttk.Scale(controls_frame, from_=0, to=0.15, 
                                 variable=self.mistake_chance, orient=tk.HORIZONTAL)
        mistake_scale.grid(row=3, column=1, sticky=(tk.W, tk.E), padx=(0, 10), pady=(5, 0))
        
        mistake_value_label = ttk.Label(controls_frame, text="3%")
        mistake_value_label.grid(row=3, column=2, pady=(5, 0))
        
        # Atualizar label da chance de erro
        def update_mistake_label(*args):
            percentage = int(self.mistake_chance.get() * 100)
            mistake_value_label.config(text=f"{percentage}%")
        
        self.mistake_chance.trace('w', update_mistake_label)
        
        # Configuração de indentação
        indent_check = ttk.Checkbutton(controls_frame, text="Usar espaços (4) em vez de tabs", 
                                      variable=self.use_spaces)
        indent_check.grid(row=4, column=0, columnspan=2, sticky=tk.W, pady=(10, 0))
        
        # Botões
        buttons_frame = ttk.Frame(main_frame)
        buttons_frame.grid(row=4, column=0, columnspan=3, pady=(10, 0))
        
        self.start_button = ttk.Button(buttons_frame, text="Iniciar Digitação", 
                                      command=self.start_typing)
        self.start_button.pack(side=tk.LEFT, padx=(0, 10))
        
        self.stop_button = ttk.Button(buttons_frame, text="Parar", 
                                     command=self.stop_typing, state=tk.DISABLED)
        self.stop_button.pack(side=tk.LEFT, padx=(0, 10))
        
        clear_button = ttk.Button(buttons_frame, text="Limpar", 
                                 command=self.clear_text)
        clear_button.pack(side=tk.LEFT)
        
        # Status
        self.status_label = ttk.Label(main_frame, text="Pronto para digitar", 
                                     foreground="green")
        self.status_label.grid(row=5, column=0, columnspan=3, pady=(10, 0))
        
        # Instruções
        instructions = """
Instruções:
1. Cole o código que deseja digitar na área de texto acima
2. Ajuste a velocidade (0.005s = ultra rápida, 0.02s = rápida padrão)
3. Configure indentação (espaços vs tabs)
4. Clique em "Iniciar Digitação"
5. Posicione o cursor onde deseja que a digitação comece durante o countdown
6. A digitação começará automaticamente após o countdown

⚡ Simulação Humana Rápida + Formatação:
- Preserva indentação e quebras de linha automaticamente
- Pausas otimizadas após quebras de linha para indentação
- Correção rápida de erros (0.1-0.4s para detectar, 0.05-0.15s para corrigir)
- Variação natural ±20% na velocidade
- Configuração flexível de espaços vs tabs

💡 Dica: Cole código já formatado - a indentação será preservada!

Dica: Pressione Ctrl+C para interromper emergencialmente (failsafe do pyautogui)
        """
        
        instructions_label = ttk.Label(main_frame, text=instructions, 
                                      font=("Arial", 9), foreground="gray")
        instructions_label.grid(row=6, column=0, columnspan=3, pady=(10, 0))
    
    def start_typing(self):
        code = self.code_text.get("1.0", tk.END).strip()
        
        if not code:
            messagebox.showwarning("Aviso", "Por favor, insira o código que deseja digitar!")
            return
        
        # Preparar código para manter formatação
        prepared_code = self.prepare_code_for_typing(code)
        
        self.is_typing = True
        self.stop_event.clear()
        self.start_button.config(state=tk.DISABLED)
        self.stop_button.config(state=tk.NORMAL)
        
        # Iniciar countdown em thread separada
        threading.Thread(target=self.countdown_and_type, args=(prepared_code,), daemon=True).start()
    
    def countdown_and_type(self, code):
        try:
            # Countdown
            for i in range(self.countdown_time.get(), 0, -1):
                if self.stop_event.is_set():
                    return
                
                self.root.after(0, lambda: self.status_label.config(
                    text=f"Digitação iniciará em {i} segundos...", foreground="orange"))
                time.sleep(1)
            
            if self.stop_event.is_set():
                return
            
            mode_text = "com simulação humana" if self.human_mode.get() else "modo robótico"
            self.root.after(0, lambda: self.status_label.config(
                text=f"Digitando {mode_text}...", foreground="blue"))
            
            # Digitar o código com comportamento humano ou normal
            if self.human_mode.get():
                self.type_with_human_behavior(code)
            else:
                # Digitação robótica original - mas mantendo formatação
                for i, char in enumerate(code):
                    if self.stop_event.is_set():
                        break
                    
                    self.type_single_char(char)
                    
                    # Atualizar progresso
                    progress = f"🤖 Digitando... {i+1}/{len(code)} caracteres"
                    self.root.after(0, lambda p=progress: self.status_label.config(text=p))
                    
                    time.sleep(self.typing_speed.get())
            
            # Finalizado
            if not self.stop_event.is_set():
                final_text = "Digitação humana concluída! 🤖" if self.human_mode.get() else "Digitação concluída!"
                self.root.after(0, lambda: self.status_label.config(
                    text=final_text, foreground="green"))
            
        except Exception as e:
            self.root.after(0, lambda: self.status_label.config(
                text=f"Erro: {str(e)}", foreground="red"))
        
        finally:
            self.root.after(0, self.reset_buttons)
    
    def stop_typing(self):
        self.stop_event.set()
        self.status_label.config(text="Digitação interrompida", foreground="red")
        self.reset_buttons()
    
    def get_human_delay(self, char, next_char=None, word_position=0):
        """Calcula delay humano baseado no contexto - versão rápida"""
        base_delay = self.typing_speed.get()
        
        if not self.human_mode.get():
            return base_delay
        
        # Variação aleatória mais sutil (±20%)
        variation = random.uniform(0.8, 1.2)
        delay = base_delay * variation
        
        # Pausas rápidas após pontuação
        if char in '.,;:!?':
            delay *= random.uniform(1.5, 2.5)  # Reduzido de 2-4 para 1.5-2.5
        
        # Pausas após quebras de linha - importantes para indentação
        elif char == '\n':
            delay *= random.uniform(1.5, 2.5)  # Pausa suficiente para nova linha
        
        # Pausas menores em espaços, mas importantes para indentação
        elif char == ' ':
            # Se é espaço no início da linha (indentação), pausa menor
            delay *= random.uniform(1.05, 1.2)  # Muito reduzido para não atrasar indentação
        
        # Pausas menores em caracteres especiais
        elif char in '(){}[]<>=+-*/':
            delay *= random.uniform(1.05, 1.3)  # Reduzido de 1.1-1.8 para 1.05-1.3
        
        # Pausas de "pensamento" mais rápidas e menos frequentes (3% chance)
        if random.random() < 0.03:
            delay *= random.uniform(2, 3.5)  # Reduzido de 3-6 para 2-3.5
        
        # Delay mínimo e máximo ajustados para velocidade
        return max(0.005, min(delay, 1.0))  # Max reduzido de 2.0 para 1.0
    
    def should_make_mistake(self):
        """Determina se deve fazer um erro"""
        if not self.human_mode.get():
            return False
        return random.random() < self.mistake_chance.get()
    
    def get_similar_char(self, char):
        """Retorna um caractere similar para simular erro de digitação"""
        # Mapeamento de teclas próximas no teclado QWERTY
        similar_chars = {
            'a': 'sq', 's': 'awd', 'd': 'sfe', 'f': 'dgr', 'g': 'fht',
            'h': 'gju', 'j': 'hki', 'k': 'jlo', 'l': 'kp',
            'q': 'wa', 'w': 'qes', 'e': 'wrd', 'r': 'etf', 't': 'ryg',
            'y': 'tuh', 'u': 'yhi', 'i': 'ujo', 'o': 'ikp', 'p': 'ol',
            'z': 'x', 'x': 'zc', 'c': 'xv', 'v': 'cb', 'b': 'vn',
            'n': 'bm', 'm': 'n',
            '1': '2', '2': '13', '3': '24', '4': '35', '5': '46',
            '6': '57', '7': '68', '8': '79', '9': '80', '0': '9'
        }
        
        if char.lower() in similar_chars:
            return random.choice(similar_chars[char.lower()])
        return char
    
    def type_with_human_behavior(self, code):
        """Digita o código com comportamento humano realístico - versão rápida"""
        i = 0
        while i < len(code) and not self.stop_event.is_set():
            char = code[i]
            next_char = code[i + 1] if i + 1 < len(code) else None
            
            # Verificar se deve fazer um erro
            if self.should_make_mistake() and char.isalnum():
                # Digitar caractere errado
                wrong_char = self.get_similar_char(char)
                pyautogui.write(wrong_char)
                
                # Pausa rápida de "percepção do erro"
                time.sleep(random.uniform(0.1, 0.4))
                
                # Corrigir com backspace - mais rápido
                pyautogui.press('backspace')
                time.sleep(random.uniform(0.05, 0.15))
                
                # Digitar o caractere correto
                self.type_single_char(char)
                
                # Atualizar status
                progress = f"🔧 Corrigindo erro... {i+1}/{len(code)}"
                self.root.after(0, lambda p=progress: self.status_label.config(text=p))
            else:
                # Digitação normal
                self.type_single_char(char)
                
                # Atualizar progresso com velocidade
                wpm = int(60 / (self.typing_speed.get() * 5)) if self.typing_speed.get() > 0 else 0
                progress = f"⚡ Digitando rápido ({wpm} WPM)... {i+1}/{len(code)}"
                self.root.after(0, lambda p=progress: self.status_label.config(text=p))
            
            # Delay baseado no contexto
            delay = self.get_human_delay(char, next_char, i)
            time.sleep(delay)
            
            i += 1
    
    def prepare_code_for_typing(self, code):
        """Prepara o código para digitação mantendo indentação"""
        # Detectar se usa tabs ou espaços
        lines = code.split('\n')
        processed_lines = []
        
        for line in lines:
            if line.strip():  # Se a linha não está vazia
                # Contar espaços iniciais
                leading_spaces = len(line) - len(line.lstrip())
                content = line.lstrip()
                
                # Manter a indentação usando espaços individuais
                processed_line = ' ' * leading_spaces + content
                processed_lines.append(processed_line)
            else:
                # Linha vazia
                processed_lines.append('')
        
        return '\n'.join(processed_lines)
    
    def type_single_char(self, char):
        """Digita um único caractere mantendo formatação"""
        if char == '\n':
            # Para quebras de linha, usar Enter
            pyautogui.press('enter')
        elif char == '\t':
            # Para tabs, usar configuração do usuário
            if self.use_spaces.get():
                pyautogui.write('    ')  # 4 espaços
            else:
                pyautogui.press('tab')   # Tab real
        else:
            # Para outros caracteres, usar write normal
            pyautogui.write(char)
    
    def reset_buttons(self):
        self.is_typing = False
        self.start_button.config(state=tk.NORMAL)
        self.stop_button.config(state=tk.DISABLED)
        self.is_typing = False
        self.start_button.config(state=tk.NORMAL)
        self.stop_button.config(state=tk.DISABLED)
    
    def clear_text(self):
        self.code_text.delete("1.0", tk.END)
        self.status_label.config(text="Texto limpo. Pronto para digitar", foreground="green")


def main():
    # Verificar se pyautogui está disponível
    try:
        import pyautogui
    except ImportError:
        print("Erro: pyautogui não está instalado.")
        print("Instale com: pip install pyautogui")
        return
    
    root = tk.Tk()
    app = CodeTyper(root)
    
    # Centralizar janela
    root.update_idletasks()
    x = (root.winfo_screenwidth() // 2) - (root.winfo_width() // 2)
    y = (root.winfo_screenheight() // 2) - (root.winfo_height() // 2)
    root.geometry(f"+{x}+{y}")
    
    root.mainloop()


if __name__ == "__main__":
    main()