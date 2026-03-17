import os
import re

def make_enrol_now_inactive(root_dir):
    # Regex to match various enrol-now paths
    # Matches href="/enrol-now", href="../enrol-now/index.html", etc.
    pattern = re.compile(r'href=["\'](?:[^"\']*/)?enrol-now(?:/index\.html|/)?["\']', re.IGNORECASE)
    
    # Also handle full domain variants
    pattern_full = re.compile(r'href=["\']https?://(?:www\.)?thenurturingroots\.com/enrol-now(?:/)?["\']', re.IGNORECASE)

    for root, dirs, files in os.walk(root_dir):
        # Skip node_modules or .git if they exist
        if 'node_modules' in dirs:
            dirs.remove('node_modules')
        if '.git' in dirs:
            dirs.remove('.git')
            
        for file in files:
            if file.endswith('.html'):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    new_content = pattern.sub('href="javascript:void(0);"', content)
                    new_content = pattern_full.sub('href="javascript:void(0);"', new_content)
                    
                    if new_content != content:
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"Updated: {file_path}")
                except Exception as e:
                    print(f"Error processing {file_path}: {e}")

if __name__ == "__main__":
    project_root = r"C:\Users\Vedant\Downloads\thenurturingroots.com"
    make_enrol_now_inactive(project_root)
