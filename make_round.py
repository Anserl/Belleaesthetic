from PIL import Image, ImageOps, ImageDraw
import sys
import os

def make_round(image_path, output_path):
    try:
        img = Image.open(image_path).convert("RGBA")
        
        # Create a mask
        mask = Image.new('L', img.size, 0)
        draw = ImageDraw.Draw(mask)
        draw.ellipse((0, 0) + img.size, fill=255)
        
        # Apply mask
        output = ImageOps.fit(img, mask.size, centering=(0.5, 0.5))
        output.putalpha(mask)
        
        output.save(output_path)
        print(f"Successfully created round image at {output_path}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python make_round.py <input> <output>")
    else:
        make_round(sys.argv[1], sys.argv[2])
