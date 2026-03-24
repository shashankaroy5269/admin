import "./globals.css";
import { ReduxProvider } from "./Redux/store/provider";

export const metadata = {
  title: "Admin Panel",
  description: "Hospital Management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}