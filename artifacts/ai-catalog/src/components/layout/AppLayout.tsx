import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 container px-4 md:px-8 py-6">
        {children}
      </main>
      <Footer />
    </div>
  );
}
