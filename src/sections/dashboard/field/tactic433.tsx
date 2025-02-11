"use client";

import { Box, Typography, Stack, Link } from "@mui/material";
import { useState } from "react";
import { PositionKey, positionColors } from "../../utils/constants";
import { useGetPlayersQuery } from "@/redux/playersApi";
import FieldPlayers from "./field-players";

const initialPositions: Record<PositionKey, { x: number; y: number }> = {
    POR: { x: 100, y: 333 },
    DFD: { x: 250, y: 420 },
    DFI: { x: 250, y: 238 },
    LD: { x: 250, y: 580 },
    LI: { x: 250, y: 88 },
    PIV: { x: 450, y: 333 },
    MCI: { x: 650, y: 203 },
    MCD: { x: 650, y: 463 },
    ED: { x: 870, y: 560 },
    EI: { x: 870, y: 105 },
    DC: { x: 1033, y: 333 },
  };

export default function Tacitc433() {
  const { data: players } = useGetPlayersQuery();
  const [positions] = useState(initialPositions);

  const tactic = "433";
  const colors = positionColors(tactic);

  return (
    <Stack spacing={4} padding={3}>
      <Box
        id="field"
        sx={{
            position: "relative",
            width: 1222,
            height: 732,
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