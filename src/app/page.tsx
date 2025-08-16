import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Welcome to <span className="text-blue-600 dark:text-blue-400">FundAFriend</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A modern Next.js project skeleton with TypeScript, Tailwind CSS, and reusable components.
            Start building your next great application!
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>🚀 Next.js 14</CardTitle>
              <CardDescription>
                Built with the latest Next.js features including App Router and Server Components
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Modern React framework with built-in optimizations and excellent developer experience.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>🎨 Tailwind CSS</CardTitle>
              <CardDescription>
                Utility-first CSS framework with custom design system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Rapidly build modern websites with utility classes and custom CSS variables.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>⚡ TypeScript</CardTitle>
              <CardDescription>
                Full TypeScript support with strict type checking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Catch errors early and build more robust applications with type safety.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Component Showcase */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Component Library
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="danger">Danger Button</Button>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <Button isLoading>Loading</Button>
            <Button disabled>Disabled</Button>
          </div>
        </div>

        {/* Getting Started */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>🚀 Getting Started</CardTitle>
            <CardDescription>
              Ready to start building? Here&apos;s what you can do next:
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 text-sm font-bold">1</div>
              <div>
                <h4 className="font-semibold">Explore the Components</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Check out the pre-built UI components in <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">src/components/ui/</code>
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 text-sm font-bold">2</div>
              <div>
                <h4 className="font-semibold">Add Your Pages</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Create new routes in the <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">src/app/</code> directory
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 text-sm font-bold">3</div>
              <div>
                <h4 className="font-semibold">Customize the Design</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Modify colors and styles in <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">tailwind.config.ts</code> and <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">globals.css</code>
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-center">
            <Button variant="primary" size="lg">
              Start Building
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
