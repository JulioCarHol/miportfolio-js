# CRUSH.md - Portfolio JS

## Build & Development Commands

### Local Development
- `open index.html` - Open portfolio in default browser
- `python -m http.server 8000` - Start local server (Python 3)
- `php -S localhost:8000` - Start local server (PHP)
- `npx http-server` - Start local server (Node.js required)

### Asset Management
- `ls assets/` - List all project assets
- `ls assets/JulJobs/` - Check JobJuls project images
- `ls assets/RestauranteJuls/` - Check Restaurante Juls images
- `ls assets/Serotonina/` - Check Serotonina project images

### File Operations
- `cp source.jpg assets/project-4.jpg` - Add new project image
- `mv assets/old.jpg assets/new.jpg` - Rename assets
- `rm assets/unwanted.jpg` - Remove unused assets

## Code Style Guidelines

### HTML
- Use semantic HTML5 elements
- UTF-8 charset declaration
- Mobile-first viewport meta tag
- Google Fonts (Poppins) for typography
- Alt attributes on all images
- Lowercase class names with hyphens
- Section-based layout structure

### CSS
- Use flexbox for layout
- Mobile-first responsive design
- CSS custom properties for colors
- Smooth transitions (0.3s ease)
- Media queries in separate file
- BEM-like naming: `.section__element--modifier`
- Mobile: `max-width: 768px`, Desktop: `min-width: 769px`

### JavaScript
- ES6+ syntax preferred
- Function declarations over arrow functions
- PascalCase for function names: `toggleMenu()`
- camelCase for variables: `currentImageIndexes`
- Const for DOM elements: `const modal = document.getElementById()`
- Array methods: `forEach`, `querySelectorAll`
- Event delegation for dynamic content
- Keyboard accessibility support

### Error Handling
- Check element existence before manipulation
- Array bounds checking for galleries
- Graceful degradation for missing features
- Console logging for debugging
- Fallbacks for single-image galleries

### Project Structure
- `index.html` - Main structure
- `style.css` - Global styles
- `mediaqueries.css` - Responsive styles
- `script.js` - All JavaScript functionality
- `assets/` - All images and resources
- Subfolders for project images

### Gallery System
- `currentImageIndexes[]` tracks each project
- `showImage(project, index)` - Display specific image
- `changeImage(project, direction)` - Navigate gallery
- `openImageModal()` - Full-screen view
- Circular navigation (1→last, last→1)
- Keyboard support: ArrowLeft/ArrowRight/Esc

### Naming Conventions
- Classes: lowercase-hyphenated
- Functions: camelCase
- Constants: UPPERCASE
- Projects: consistent naming
- Images: descriptive names
- Alt text: meaningful descriptions

### Performance
- Optimize image sizes
- Lazy loading for galleries
- Minimal DOM manipulation
- Event delegation
- CSS transforms over JS animations

### Accessibility
- Semantic HTML structure
- ARIA labels on icons
- Keyboard navigation
- Focus management
- Alt text for all images
- Skip navigation links

### Git Workflow
- Feature branches for updates
- Descriptive commit messages
- Assets in separate commits
- Test locally before push
- Update PROYECTO_CONTEXT.md for changes