import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://front-end-next-js-task-taupe.vercel.app/"),
  title: "Our Products",
  description: "This page has products",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
