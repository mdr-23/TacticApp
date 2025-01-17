import { Box } from "@mui/material";
import "./globals.css";
import ClientProvider from "@/components/ClientProvider";
import ThemeProvider from "@/theme/theme";
import { CustomThemeProvider } from "@/theme/theme-context";
import { AuthProvider } from "@/auth/context/auth-context";

export const metadata = {
  title: "Kadermeister",
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
        <Box>
          <CustomThemeProvider>
            <AuthProvider>
              <ClientProvider>{children}</ClientProvider>
            </AuthProvider>
          </CustomThemeProvider>
        </Box>
      </body>
    </html>
  );
}