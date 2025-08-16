# FundAFriend - Next.js Project Skeleton

A modern, production-ready Next.js project skeleton with TypeScript, Tailwind CSS, and a comprehensive component library.

## 🚀 Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** with custom design system
- **ESLint** configuration
- **Reusable UI Components** (Button, Card, etc.)
- **Custom Hooks** (useLocalStorage)
- **Utility Functions** for common operations
- **Responsive Design** with mobile-first approach
- **Dark Mode Support** (CSS variables ready)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── globals.css        # Global styles and CSS variables
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Home page
├── components/             # Reusable UI components
│   └── ui/                # Base UI components
│       ├── Button.tsx     # Button component with variants
│       └── Card.tsx       # Card component family
├── hooks/                  # Custom React hooks
│   └── useLocalStorage.ts # Local storage hook
├── lib/                    # Utility libraries
│   └── utils.ts           # Common utility functions
├── types/                  # TypeScript type definitions
│   └── index.ts           # Common interfaces and types
├── styles/                 # Additional styles (if needed)
└── utils/                  # Utility functions (if needed)
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd FundAFriend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Available Components

### Button Component
```tsx
import { Button } from "@/components/ui/Button";

// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// States
<Button isLoading>Loading</Button>
<Button disabled>Disabled</Button>
```

### Card Component
```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content goes here</CardContent>
  <CardFooter>Footer content</CardFooter>
</Card>
```

## 🎯 Customization

### Colors and Theme
Modify the design system in `tailwind.config.ts` and `src/app/globals.css`:

- **Primary Colors**: Update the `--primary` CSS variables
- **Color Palette**: Modify the HSL values in the `:root` selector
- **Dark Mode**: Customize the `.dark` class variables

### Adding New Components
1. Create your component in `src/components/ui/`
2. Follow the existing pattern with TypeScript interfaces
3. Use the `cn()` utility for class merging
4. Export both the component and its types

### Adding New Pages
1. Create new directories in `src/app/`
2. Add `page.tsx` files for routes
3. Use the existing layout structure

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 📚 Dependencies

### Core Dependencies
- **Next.js 14** - React framework
- **React 18** - UI library
- **TypeScript** - Type safety

### UI Dependencies
- **Tailwind CSS** - Utility-first CSS framework
- **clsx** - Conditional className utility
- **tailwind-merge** - Tailwind class merging

### Development Dependencies
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **@types/node** - Node.js types
- **@types/react** - React types

## 🌟 Best Practices

1. **Type Safety**: Always define TypeScript interfaces for props
2. **Component Composition**: Use composition over inheritance
3. **Utility Functions**: Keep components focused, extract logic to utilities
4. **CSS Variables**: Use CSS custom properties for theming
5. **Responsive Design**: Mobile-first approach with Tailwind breakpoints

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on push

### Other Platforms
- **Netlify**: Use `npm run build` and deploy the `out` directory
- **AWS Amplify**: Connect your repository and build with `npm run build`
- **Docker**: Create a Dockerfile for containerized deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you have any questions or need help:

1. Check the [Next.js documentation](https://nextjs.org/docs)
2. Review the [Tailwind CSS docs](https://tailwindcss.com/docs)
3. Open an issue in this repository

---

**Happy coding! 🎉**
