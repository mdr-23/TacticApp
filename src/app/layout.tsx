import { Box } from "@mui/material";
import "./globals.css";
import ClientProvider from "@/components/ClientProvider"; // Creamos un componente para el Provider
import ThemeClientProvider from "@/components/ThemeClientProvider";

export const metadata = {
  title: "TacticApp",
  description: "App para gestión de jugadores",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Box padding={5}>
          <ThemeClientProvider>
            <ClientProvider>{children}</ClientProvider>
          </ThemeClientProvider>
        </Box>
      </body>
    </html>
  );
}