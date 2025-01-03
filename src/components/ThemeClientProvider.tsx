"use client";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/components/theme/theme";

export default function ThemeClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Normaliza estilos globales */}
      {children}
    </ThemeProvider>
  );
}