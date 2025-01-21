"use client";

import { Box, Stack, Tab, Tabs, Typography, useTheme } from "@mui/material";
import PlayersList from "./players-list/players-list";
import { useGetPlayersQuery } from "@/redux/playersApi";
import { useResponsive } from "@/hooks/use-responsive";
import DashboardAddPlayer from "./add-player.tsx/dashboard-add-player";
import Tacitc433 from "./field/tactic433";
import { useState } from "react";
import Tacitc352 from "./field/tactic352";

export default function Dashboard() {
  const isMobile = useResponsive("down", "sm")
  const theme = useTheme()
  const { data } = useGetPlayersQuery();

  const [value, setValue] = useState('433');

  const tabs = [
    { id: 1, value: '433' },
    { id: 2, value: '352' },
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    const foundTab = tabs.find((tab) => tab.value === newValue);
    if (foundTab) {
      setValue(foundTab.value);
    }
  };

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

            <Tabs
              onChange={handleTabChange}
              value={value}
              aria-label="Tabs"
              sx={{
                position: 'sticky',
                top: 0,
                zIndex: 2,
              }}
            >
              {tabs.map((item) => (
                <Tab
                  key={item.id}
                  value={item.value}
                  label={
                    <Box sx={{ display: 'flex' }} gap={1}>
                      <Typography
                        color={value === item.value ? 'text.primary' : 'text.secondary'}
                        variant="subtitle2"
                      >
                        Esquema {item.value}
                      </Typography>
                    </Box>
                  }
                />
              ))}
            </Tabs>

          {!isMobile && value === '433' &&
          <Stack alignItems={'center'}>
            <Tacitc433 />
          </Stack>}

          {!isMobile && value === '352' &&
          <Stack alignItems={'center'}>
            <Tacitc352 />
          </Stack>}
        </Stack>

        <PlayersList data={data} />
      </Stack>
    </Stack>
  );
}