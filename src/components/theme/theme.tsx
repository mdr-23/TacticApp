'use client';

import { useMemo } from 'react';
import merge from 'lodash/merge';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeOptions, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

import { palette } from './palette';
import { typography } from './typography';

// Opcional: Importa otras configuraciones como shadows o customShadows si las necesitas
import { shadows } from './shadows';
import { customShadows } from './custom-shadows';

type Props = {
  children: React.ReactNode;
  mode: 'light' | 'dark'; // Puedes obtener este valor desde algún contexto o prop
};

export default function ThemeProvider({ children, mode }: Props) {
  // Memoizar el valor del tema para evitar renders innecesarios
  const memoizedValue = useMemo(() => {
    return {
      palette: {
        ...palette(mode),
      },
      customShadows: {
        ...customShadows(mode), // Opcional: añade sombras personalizadas
      },
      shadows: shadows(mode), // Opcional: añade sombras base
      shape: { borderRadius: 8 }, // Configuración de bordes
      typography: {
        ...typography,
      },
    };
  }, [mode]);

  // Crear el tema
  const theme = createTheme(memoizedValue as ThemeOptions);

  // Si necesitas sobrescribir componentes globales
  theme.components = merge({}, theme.components);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}