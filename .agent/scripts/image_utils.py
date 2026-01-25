from PIL import Image
import os
import sys

# Default Configuration
OUTPUT_DIR = r"assets"
TARGET_WIDTH = 920
TARGET_HEIGHT = 450

def extend_canvas_left(image_path, target_width, target_height):
    try:
        print(f"Processing {image_path}...")
        image = Image.open(image_path)
        
        # 1. Resize image so its height matches target_height (preserving aspect ratio)
        aspect_ratio = image.width / image.height
        new_height = target_height
        new_width = int(new_height * aspect_ratio)
        
        resized_img = image.resize((new_width, new_height), Image.Resampling.LANCZOS)
        
        # 2. Create new canvas
        canvas = Image.new("RGB", (target_width, target_height))
        
        # 3. Paste resized image on the RIGHT
        paste_x = target_width - new_width
        canvas.paste(resized_img, (paste_x, 0))
        
        # 4. Fill the left side with a stretched version of the left-most pixel column
        left_edge = resized_img.crop((0, 0, 1, new_height)) # 1xHeight strip
        left_fill = left_edge.resize((paste_x, new_height), Image.Resampling.BICUBIC)
        
        canvas.paste(left_fill, (0, 0))
        
        # Save
        filename = os.path.basename(image_path)
        output_filename = filename.replace(".png", "_extended_920x450.png")
        
        # Determine output path (same dir as input if default output dir fails, or specific logic)
        # For simplicity in this script, we output to same directory as input
        output_dir = os.path.dirname(image_path)
        output_path = os.path.join(output_dir, output_filename)
        
        canvas.save(output_path)
        print(f"Success: Saved to {output_path}")
        return output_path
        
    except Exception as e:
        print(f"Error processing {image_path}: {e}")
        return None

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python image_utils.py [image_path]")
        sys.exit(1)

    image_path = sys.argv[1]
    
    if not os.path.exists(image_path):
        print(f"Error: File not found at {image_path}")
        sys.exit(1)
        
    extend_canvas_left(image_path, TARGET_WIDTH, TARGET_HEIGHT)
