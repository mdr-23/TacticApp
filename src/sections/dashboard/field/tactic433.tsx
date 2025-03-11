"use client";

import { Box, Typography, Stack, Link } from "@mui/material";
import { useState } from "react";
import { PositionKey, positionColors } from "../../utils/constants";
import { useGetPlayersQuery } from "@/redux/playersApi";
import FieldPlayers from "./field-players";
import { useResponsive } from "@/hooks/use-responsive";

const initialPositions: Record<PositionKey, { x: number; y: number }> = {
    POR: { x: 158, y: 400 },
    DFD: { x: 350, y: 495 },
    DFI: { x: 350, y: 305 },
    LD: { x: 380, y: 670 },
    LI: { x: 380, y: 105 },
    PIV: { x: 580, y: 400 },
    MCI: { x: 800, y: 203 },
    MCD: { x: 800, y: 560 },
    ED: { x: 1040, y: 640 },
    EI: { x: 1040, y: 105 },
    DC: { x: 1168, y: 400 },
  };

export default function Tacitc433() {
  const { data: players } = useGetPlayersQuery();
  const isTablet = useResponsive("down", "xl")
  const [positions] = useState(initialPositions);

  const tactic = "433";
  const colors = positionColors(tactic);

  return (
    <Stack spacing={4} padding={3}>
      <Box
        id="field"
        sx={{
            position: "relative",
            width: !isTablet ? 1722 : 1450,
            height: 852,
            backgroundImage: `url('/field-img.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            border: "2px solid white",
            borderRadius: "8px",
            margin: "0 auto",
          }}
      >
        {/* Renderizar las fichas en la cancha */}
        {(Object.keys(colors) as PositionKey[]).map((position) => (
          <FieldPlayers
            key={position}
            position={position}
            players={players?.filter((p) => p.position === position) || []}
            color={colors[position] ?? "#000000"}
            x={positions[position].x}
            y={positions[position].y}
          />
        ))}
      </Box>
    </Stack>
  );
}