"use client";

import { Stack, Typography, useTheme } from "@mui/material";
import Field from "./field/field";
import PlayersList from "./players-list/players-list";
import { useGetPlayersQuery } from "@/redux/playersApi";
import { useResponsive } from "@/hooks/use-responsive";
import DashboardAddPlayer from "./add-player.tsx/dashboard-add-player";

export default function Dashboard() {
  const isMobile = useResponsive("down", "sm")
  const theme = useTheme()
  const { data } = useGetPlayersQuery();

  return (
    <Stack spacing={3} padding={isMobile ? 0 : 5}>
      <Stack>
        <Typography variant="h4">
          Willkommen bei Kadermeister 👋
        </Typography>
        <Typography variant="subtitle2" color={theme.palette.primary.main}>
          Dein Team, deine Entscheidungen
        </Typography>
      </Stack>

      <Stack direction={'column'} spacing={3}>
        <Stack
              sx={{
                  borderRadius: 2,
                  border: `solid 1px ${theme.palette.divider}`,
                  flexGrow: 1,
                  overflow: 'hidden',
              }}
              spacing={3}
              padding={3}
          >
            <Typography variant="h6">
              Campo
            </Typography>

            <DashboardAddPlayer />

          {!isMobile &&
          <Stack alignItems={'center'}>
            <Field />
          </Stack>}
        </Stack>

        <PlayersList data={data} />
      </Stack>
    </Stack>
  );
}