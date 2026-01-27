import os
from PIL import Image

def convert_to_webp():
    img_dir = 'img'
    if not os.path.exists(img_dir):
        print(f"Error: La carpeta '{img_dir}' no existe.")
        return

    # Extensiones compatibles
    extensions = ('.png', '.jpg', '.jpeg')
    
    count = 0
    for root, dirs, files in os.walk(img_dir):
        for file in files:
            if file.lower().endswith(extensions):
                input_path = os.path.join(root, file)
                # Crear nombre para webp
                output_path = os.path.splitext(input_path)[0] + '.webp'
                
                try:
                    with Image.open(input_path) as img:
                        # Convertir a RGB si es necesario (para evitar errores con RGBA en formatos específicos)
                        if img.mode in ('RGBA', 'P') and file.lower().endswith(('.jpg', '.jpeg')):
                            img = img.convert('RGB')
                        
                        img.save(output_path, 'WEBP', quality=85)
                        print(f"✅ Convertido: {input_path} -> {output_path}")
                        count += 1
                except Exception as e:
                    print(f"❌ Error convirtiendo {input_path}: {e}")

    print(f"\n--- Resumen: {count} imágenes convertidas a WebP ---")

if __name__ == "__main__":
    convert_to_webp()
