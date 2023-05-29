import Header from "@/components/Header";
import "./global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">
        <Header />
        {children}
      </body>
    </html>
  );
}
