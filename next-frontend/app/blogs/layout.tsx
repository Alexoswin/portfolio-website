import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AnimatedGradient } from "@/components/ui/animated-gradient";
import { MotionProvider } from "@/components/motion-provider";
import { Suspense } from "react";

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MotionProvider>
      <div className="relative min-h-screen flex flex-col">
        <AnimatedGradient />
        <Navbar />
        <main className="flex-grow pt-24 pb-16 container mx-auto px-4 md:px-6">
          {children}
        </main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </MotionProvider>
  );
}
