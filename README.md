# Portfolio Website

A modern, responsive portfolio website built with Next.js, React, TypeScript, and Tailwind CSS. Perfect for showcasing your computer engineering and robotics projects.

## Features

- **Responsive Design**: Fully responsive across all devices
- **Modern UI**: Clean, aesthetically pleasing interface with smooth animations
- **Section Navigation**: Smooth scrolling between Home, Portfolio, About, and Contact sections
- **Project Showcase**: Interactive project tabs with detailed modal views
- **Contact Form**: Functional contact form with validation
- **Dark Mode**: Automatic dark mode support based on system preferences
- **Animations**: Smooth page transitions and hover effects using Framer Motion
- **Customizable**: Easy to customize with your own content, colors, and projects

## Tech Stack

- **Next.js 15** - React framework for production
- **React 18** - JavaScript library for building user interfaces
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Beautiful icon set

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd portfolio-website
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Customization

### Update Personal Information

1. **Home Section** (`app/components/Home.tsx`):
   - Update your title and description
   - Change social media links (GitHub, LinkedIn, email)

2. **Portfolio Section** (`app/components/Portfolio.tsx`):
   - Edit the `projects` array to add/modify your projects
   - Each project includes:
     - Title and description
     - Technologies used
     - GitHub and demo links
     - Category and detailed features
     - Custom icon

3. **About Section** (`app/components/About.tsx`):
   - Update your bio and background
   - Modify the `skills` array with your technical skills
   - Edit the `interests` array with your areas of interest

4. **Contact Section** (`app/components/Contact.tsx`):
   - Update your email, phone, and location
   - Change social media links
   - Configure form submission endpoint if needed

### Styling

- Modify `app/globals.css` for global styles
- Tailwind configuration is in `tailwind.config.ts`
- Change color scheme by updating gradient colors throughout components

### Adding Projects

To add a new project, edit `app/components/Portfolio.tsx` and add a new object to the `projects` array:

```typescript
{
  id: 'unique-id',
  title: 'Project Title',
  description: 'Brief description',
  technologies: ['Tech1', 'Tech2', 'Tech3'],
  github: 'https://github.com/username/repo',
  demo: 'https://demo-url.com',
  category: 'Robotics', // or 'AI/ML', 'IoT', etc.
  icon: Cpu, // Choose from lucide-react icons
  details: [
    'Feature or achievement 1',
    'Feature or achievement 2',
    // Add more details...
  ],
}
```

## Project Structure

```
portfolio-website/
├── app/
│   ├── components/
│   │   ├── Navigation.tsx    # Navigation bar with smooth scrolling
│   │   ├── Home.tsx          # Hero section
│   │   ├── Portfolio.tsx     # Projects showcase with tabs
│   │   ├── About.tsx         # About section with skills
│   │   └── Contact.tsx       # Contact form
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main page
├── public/                   # Static assets
├── package.json
└── README.md
```

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `.next` folder.

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and configure the build settings
4. Click "Deploy"

### Deploy to Other Platforms

- **Netlify**: Connect your Git repository and deploy
- **AWS Amplify**: Use the Amplify console to deploy
- **Self-hosted**: Run `npm run build` then `npm start`

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

For questions or suggestions, feel free to reach out through the contact form on the website or via email.

---

Built with Next.js and Tailwind CSS
