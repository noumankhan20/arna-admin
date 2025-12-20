import "./globals.css";
import AdminLayout from "@/component/layout/AdminLayout";
import ClientRouteLayout from "@/component/layout/ClientRouteLayout";

export const metadata = {
  title: "Arna Analytics",
  description: "Admin dashboard and CMS",
};

export default function RootLayout({ children }) {
  // Server component – no hooks here
  return (
    <html lang="en">
      <body className="min-h-screen">
        <ClientRouteLayout adminLayout={AdminLayout}>
          {children}
        </ClientRouteLayout>
      </body>
    </html>
  );
}
