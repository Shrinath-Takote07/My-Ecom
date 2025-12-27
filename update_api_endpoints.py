import os
import re

# Define the base path
BASE_PATH = r"c:\Users\USER\Downloads\Changes\My-Ecom-main\My-Ecom-main\my-project\src\Components\Products"

# List of component files to update
COMPONENT_FILES = [
    "Beauty.jsx",
    "Bags.jsx",
    "Fashion.jsx",
    "Footwear.jsx",
    "Groceries.jsx",
    "Electronics.jsx"
]

# Define replacements
URL_REPLACEMENTS = [
    # API endpoint replacements
    (r'"https://my-ecommm\.vercel\.app/api/Beauty"', 'API_ENDPOINTS.beauty'),
    (r'"https://my-ecommm\.vercel\.app/api/Bags"', 'API_ENDPOINTS.bags'),
    (r'"https://my-ecommm\.vercel\.app/api/Fashions"', 'API_ENDPOINTS.fashions'),
    (r'"https://my-ecommm\.vercel\.app/api/footwears"', 'API_ENDPOINTS.footwears'),
    (r'"https://my-ecommm\.vercel\.app/api/Groceries"', 'API_ENDPOINTS.groceries'),
    (r'"https://my-ecommm\.vercel\.app/api/Electronics"', 'API_ENDPOINTS.electronics'),
    (r'"https://my-ecommm\.vercel\.app/api/wishlist"', 'API_ENDPOINTS.wishlist'),
]

def add_import_statement(content):
    """Add API_ENDPOINTS import if not already present"""
    if 'import API_ENDPOINTS from' in content:
        return content
    
    # Find the last import statement
    import_pattern = r'(import.*?from\s+["\'].*?["\'];?\n)'
    imports = list(re.finditer(import_pattern, content, re.MULTILINE))
    
    if imports:
        last_import = imports[-1]
        insert_position = last_import.end()
        new_import = 'import API_ENDPOINTS from "../../config/api";\n'
        content = content[:insert_position] + new_import + content[insert_position:]
    
    return content

def update_file(filepath):
    """Update a single file with API endpoint replacements"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Add import statement
        content = add_import_statement(content)
        
        # Replace all hardcoded URLs
        for pattern, replacement in URL_REPLACEMENTS:
            content = re.sub(pattern, replacement, content)
        
        # Only write if changes were made
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✓ Updated: {os.path.basename(filepath)}")
            return True
        else:
            print(f"- No changes needed: {os.path.basename(filepath)}")
            return False
    except Exception as e:
        print(f"✗ Error updating {os.path.basename(filepath)}: {str(e)}")
        return False

def main():
    print("🔄 Updating product components with API configuration...\n")
    
    updated_count = 0
    for filename in COMPONENT_FILES:
        filepath = os.path.join(BASE_PATH, filename)
        if os.path.exists(filepath):
            if update_file(filepath):
                updated_count += 1
        else:
            print(f"⚠ File not found: {filename}")
    
    print(f"\n✅ Updated {updated_count} file(s)")
    print("✨ All files processed successfully!")

if __name__ == "__main__":
    main()
