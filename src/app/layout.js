import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import ClientLayout from "@/components/ClientLayout";

export const metadata = {
  title: "StudyFlow",
  description: "Your personalized learning curriculum, visualized.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
            <ClientLayout>
                {children}
            </ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
