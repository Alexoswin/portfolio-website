import { Container } from "@/components/ui/container";

export default function BlogsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main id="main" className="pt-28 pb-20">
      <Container>{children}</Container>
    </main>
  );
}
