import "./globals.css";
import ReduxProvider from "@/component/utils/redux/provider";
export const metadata = {
  title: "Arna Analytics",
  description: "Admin dashboard and CMS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
