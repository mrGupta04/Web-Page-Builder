Web Page Builder

A modern, intuitive WYSIWYG (What You See Is What You Get) web page builder inspired by WordPress and Wix. Create beautiful web pages with drag-and-drop functionality without writing any code.

https://via.placeholder.com/800x400?text=Web+Page+Builder+Screenshot

🌟 Live Demo
Experience the builder live: https://web-page-builder-six.vercel.app/

✨ Features
🎨 Core Functionality
Drag & Drop Interface - Intuitive component placement

Multiple Component Types - Text, Images, Buttons, Containers, Dividers, and Videos

Real-time Editing - Edit content directly on the canvas

Preview Mode - Toggle between edit and preview modes

Undo/Redo - Full history management with undo/redo capabilities

🎛️ Component Features
Text Components - Rich text editing with styling options

Image Components - Upload and customize images

Button Components - Fully customizable buttons with hover effects

Container Components - Flexible containers for layout management

Video Components - Embed and customize videos

Divider Components - Visual separators with custom styling

💅 Styling Options
Typography Controls - Font size, color, weight, alignment

Color Customization - Background and text colors

Layout Properties - Padding, margins, borders, borderRadius

Visual Effects - Shadows, opacity, filters

Responsive Design - Components adapt to different screen sizes

💾 Save & Export
Local Storage - Automatic saving of your work

Export Projects - Download your design as JSON

Import Projects - Upload and continue previous work

Template System - Save components as reusable blocks

🚀 Getting Started
Prerequisites
Node.js (version 14 or higher)

npm or yarn

Installation
Clone the repository

bash
git clone https://github.com/your-username/web-page-builder.git
cd web-page-builder
Install dependencies

bash
npm install
Start the development server

bash
npm start
Open your browser
Navigate to http://localhost:3000

Building for Production
bash
npm run build
This creates a build folder with optimized production files.

🛠️ Technology Stack
Frontend Framework: React 18.2.0

Drag & Drop: React DnD (Drag and Drop)

Styling: CSS3 with Flexbox and Grid

Icons: Emoji-based icon system

State Management: React useState and useCallback hooks

Storage: Browser Local Storage API

📖 How to Use
Creating a New Page
Drag Components from the toolbar to the canvas

Click on Components to select and edit them

Use the Properties Panel to customize styling

Toggle Preview Mode to see your final page

Save Your Work using the save button

Component Guide
Text: Double-click to edit text content

Images: Click the upload button to add images

Buttons: Customize text, colors, and hover effects

Containers: Use for grouping and layout organization

Videos: Add video URLs or upload video files

Keyboard Shortcuts
Ctrl+Z / Cmd+Z - Undo

Ctrl+Shift+Z / Cmd+Shift+Z - Redo

P - Toggle preview mode

Delete - Remove selected component

🏗️ Project Structure
text
src/
├── components/
│   ├── Canvas/           # Main canvas area
│   ├── Toolbar/          # Component toolbar
│   ├── PropertiesPanel/  # Component properties
│   └── Header/           # Application header
├── hooks/                # Custom React hooks
├── utils/                # Utility functions
├── constants/            # App constants
└── styles/               # CSS stylesheets
🌐 Browser Support
Chrome (recommended)

Firefox

Safari

Edge

Mobile browsers (limited functionality)

🔧 Customization
Adding New Components
Add component type to src/constants/index.js

Create component in src/components/Canvas/

Add to toolbar in src/components/Toolbar/

Create properties panel in src/components/PropertiesPanel/

Theming
Modify CSS variables in src/styles/theme.css to customize colors and styling.

📱 Responsive Design
The Web Page Builder is fully responsive and works on:

Desktop computers

Tablets

Mobile devices (with some limitations on complex operations)

🤝 Contributing
We welcome contributions! Please follow these steps:

Fork the project

Create a feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

📄 License
This project is licensed under the MIT License - see the LICENSE.md file for details.

🐛 Known Issues
Mobile touch interactions can be less precise than mouse

Very complex layouts may experience performance issues

Some browser extensions may interfere with drag-and-drop functionality

🚧 Roadmap
Upcoming Features
Component templates and presets

Advanced layout grids

Collaboration features

Plugin system

Export to HTML/CSS

AI-assisted design suggestions

In Progress
Enhanced mobile support

Keyboard navigation improvements

Performance optimizations

📞 Support
If you have any questions or issues:

Check the Known Issues section

Search existing GitHub Issues

Create a new issue with detailed information

🙏 Acknowledgments
Inspired by WordPress Gutenberg and Wix Editor

Built with Create React App

Drag & Drop functionality by React DnD

Icons from Twemoji

📊 Analytics
https://visitor-badge.glitch.me/badge?page_id=web-page-builder
https://img.shields.io/github/stars/your-username/web-page-builder?style=social
