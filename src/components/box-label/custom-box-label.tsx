import React from 'react';

import { Stack } from '@mui/system';
import { useTheme, Typography } from '@mui/material';

type Props = {
  label: string;
  children: React.ReactNode;
  icon?: any;
};

export default function CustomLabeledBox({ label, children, icon }: Props) {
  const theme = useTheme();
  const isLightMode = theme.palette.mode === 'light';

  return (
    <Stack
      spacing={2}
      padding={3}
      sx={{
        borderRadius: 2,
        border: `solid 1px ${theme.palette.divider}`,
        position: 'relative',
      }}
    >
      <Stack
        direction="row"
        spacing={0.5}
        color="text.primary"
        alignItems="center"
        sx={{
          position: 'absolute',
          top: -9,
          left: 15,
          paddingLeft: 0.75,
          paddingRight: 0.75,
          bgcolor: isLightMode ? theme.palette.background.paper : theme.palette.grey[900],
        }}
      >
        <Typography
          variant="caption"
          color="text.primary"
          sx={{
            fontWeight: 600,
          }}
        >
          {label}
        </Typography>
        {icon}
      </Stack>

      {children}
    </Stack>
  );
}
