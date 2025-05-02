import cv2
import numpy as np

# Faixas HSV para cores comuns
color_ranges = {
    'vermelho': [(np.array([0, 120, 70]), np.array([10, 255, 255]))],
    'verde': [(np.array([35, 50, 50]), np.array([85, 255, 255]))],
    'azul': [(np.array([100, 150, 0]), np.array([140, 255, 255]))]
}

# Solicita entrada
print("Digite o nome da cor (vermelho, verde, azul) ou 'custom' para inserir HSV manualmente:")
cor = input("Cor: ").strip().lower()

# Se "custom", pede os valores HSV
if cor == 'custom':
    try:
        h = int(input("Hue (0–179): "))
        s = int(input("Saturation (0–255): "))
        v = int(input("Value (0–255): "))
        tolerancia = 10

        lower = np.array([max(0, h - tolerancia), max(0, s - 40), max(0, v - 40)])
        upper = np.array([min(179, h + tolerancia), min(255, s + 40), min(255, v + 40)])
        selected_ranges = [(lower, upper)]
        cor_label = f"HSV({h},{s},{v})"
    except ValueError:
        print("Valores inválidos. Use apenas números.")
        exit()
elif cor in color_ranges:
    selected_ranges = color_ranges[cor]
    cor_label = cor
else:
    print("Cor não reconhecida. As opções são:", ', '.join(list(color_ranges.keys()) + ['custom']))
    exit()

# Carrega imagem
image = cv2.imread('imagens/exemplo.jpg')
if image is None:
    print("Erro ao carregar a imagem.")
    exit()

# Aplica blur para melhorar a detecção
blurred = cv2.GaussianBlur(image, (9, 9), 0)

# Converte imagem com blur para HSV
hsv = cv2.cvtColor(blurred, cv2.COLOR_BGR2HSV)

# Cria máscara para a cor
mask = None
for (lower, upper) in selected_ranges:
    current_mask = cv2.inRange(hsv, lower, upper)
    mask = current_mask if mask is None else cv2.bitwise_or(mask, current_mask)

# Reduz ruído na máscara
kernel = np.ones((5, 5), np.uint8)
mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)

# Encontra contornos
contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

# Conta e desenha objetos encontrados
contagem = 0
for contour in contours:
    area = cv2.contourArea(contour)
    if area > 200:
        x, y, w, h = cv2.boundingRect(contour)
        cv2.rectangle(image, (x, y), (x + w, y + h), (0, 255, 0), 2)
        contagem += 1

# Mostra total na tela
cv2.putText(image, f"Objetos '{cor_label}': {contagem}", (10, 30),
            cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 0, 0), 2)

# Exibe imagem final com contornos
cv2.imshow('Resultado', image)
cv2.waitKey(0)
cv2.destroyAllWindows()
