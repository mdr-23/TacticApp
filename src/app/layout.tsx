import { Box } from "@mui/material";
import "./globals.css";
import ClientProvider from "@/components/ClientProvider"; // Creamos un componente para el Provider
import ThemeProvider from "@/components/theme/theme";
import { CustomThemeProvider } from "@/components/theme/theme-context";

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
          <CustomThemeProvider>
            <ClientProvider>{children}</ClientProvider>
          </CustomThemeProvider>
        </Box>
      </body>
    </html>
  );
}