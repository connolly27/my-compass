import os
import json
from pathlib import Path
from typing import Dict, List, Set

class NextJsProjectAnalyzer:
    def __init__(self, project_path: str):
        self.project_path = Path(project_path)
        self.ignored_dirs = {'.git', 'node_modules', '.next', 'out', 'build'}
        self.important_files = {
            'package.json',
            'tsconfig.json',
            'next.config.js',
            'tailwind.config.js',
            'postcss.config.js',
            '.eslintrc.json'
        }

    def read_file_content(self, file_path: Path) -> str:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                return f.read()
        except Exception as e:
            return f"Error reading file: {str(e)}"

    def analyze_package_json(self) -> Dict:
        package_json = self.project_path / 'package.json'
        if package_json.exists():
            content = self.read_file_content(package_json)
            try:
                return json.loads(content)
            except json.JSONDecodeError:
                return {"error": "Invalid package.json"}
        return {"error": "package.json not found"}

    def find_components(self) -> List[Dict]:
        components = []
        app_dir = self.project_path / 'app'
        components_dir = self.project_path / 'components'
        
        for directory in [app_dir, components_dir]:
            if directory.exists():
                for file_path in directory.rglob('*'):
                    if file_path.suffix in ['.tsx', '.jsx', '.ts', '.js'] and not file_path.name.startswith('.'):
                        content = self.read_file_content(file_path)
                        components.append({
                            'path': str(file_path.relative_to(self.project_path)),
                            'content': content
                        })
        return components

    def analyze_routing(self) -> List[Dict]:
        routes = []
        app_dir = self.project_path / 'app'
        
        if app_dir.exists():
            for file_path in app_dir.rglob('page.*'):
                if file_path.suffix in ['.tsx', '.jsx', '.ts', '.js']:
                    route_path = str(file_path.parent.relative_to(app_dir)).replace(os.sep, '/')
                    if route_path == '.':
                        route_path = '/'
                    routes.append({
                        'route': route_path,
                        'file': str(file_path.relative_to(self.project_path))
                    })
        return routes

    def analyze_config_files(self) -> Dict[str, str]:
        configs = {}
        for file_name in self.important_files:
            file_path = self.project_path / file_name
            if file_path.exists():
                configs[file_name] = self.read_file_content(file_path)
        return configs

    def analyze_project(self) -> Dict:
        return {
            'package': self.analyze_package_json(),
            'components': self.find_components(),
            'routes': self.analyze_routing(),
            'configs': self.analyze_config_files()
        }

def main():
    # Use current directory as project path
    analyzer = NextJsProjectAnalyzer('.')
    analysis = analyzer.analyze_project()
    
    # Pretty print the analysis to console
    print("\n=== Next.js Project Analysis ===\n")
    
    print("📦 Dependencies:")
    package_info = analysis['package']
    if 'dependencies' in package_info:
        for dep, version in package_info['dependencies'].items():
            print(f"  - {dep}: {version}")
    
    print("\n🛣️  Routes:")
    for route in analysis['routes']:
        print(f"  - {route['route']} -> {route['file']}")
    
    print("\n🧩 Components:")
    for component in analysis['components']:
        print(f"  - {component['path']}")
    
    print("\n⚙️  Configuration Files:")
    for config_name in analysis['configs'].keys():
        print(f"  - {config_name}")
    
    # Save the full analysis to a JSON file
    with open('project_analysis.json', 'w', encoding='utf-8') as f:
        json.dump(analysis, f, indent=2)
    
    print("\n📝 Full analysis saved to project_analysis.json")

if __name__ == "__main__":
    main()