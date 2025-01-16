import Box, { BoxProps } from '@mui/material/Box';

import { useResponsive } from 'src/hooks/use-responsive';
import { HEADER, NAV } from '../config-layout';

// ----------------------------------------------------------------------

const SPACING = 8;

export default function Main({ children, sx, ...other }: BoxProps) {

  const lgUp = useResponsive('up', 'lg');

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        minHeight: 1,
        display: 'flex',
        flexDirection: 'column',
        py: `${HEADER.H_DESKTOP + SPACING}px`,
        px: 2,
        pb: 3,
        ...(lgUp && {
          py: `${HEADER.H_DESKTOP + SPACING}px`,
          pb: 6,
          width: `calc(100% - ${NAV.W_VERTICAL}px)`,
        }),
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  );
}
