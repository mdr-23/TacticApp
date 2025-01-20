"use client";

import { Box, Typography, Stack, Link } from "@mui/material";
import { useState } from "react";
import { PositionKey352, positionColors } from "../../utils/constants";
import { useGetPlayersQuery } from "@/redux/playersApi";
import FieldPlayers from "./field-players";

const initialPositions: Record<PositionKey352, { x: number; y: number }> = {
    POR: { x: 100, y: 333 },
    DFD: { x: 250, y: 518 },
    DFI: { x: 250, y: 153 },
    DFC: { x: 250, y: 333 },
    MCI: { x: 500, y: 243 },
    MCD: { x: 500, y: 423 },
    MD: { x: 500, y: 577 },
    MI: { x: 500, y: 86 },
    MCO: { x: 750, y: 333 },
    DLD: { x: 1033, y: 455 },
    DLI: { x: 1033, y: 210 },
  };

export default function Tacitc352() {
  const { data: players } = useGetPlayersQuery();
  const [positions] = useState(initialPositions);

  const tactic = "352";
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
        {(Object.keys(colors) as PositionKey352[]).map((position) => (
          <FieldPlayers
            key={position}
            position={position}
            players={players?.filter((p) => p.secondPosition ? p.secondPosition === position : p.position === position) || []}
            color={colors[position] ?? "#000000"}
            x={positions[position].x}
            y={positions[position].y}
          />
        ))}
      </Box>
    </Stack>
  );
}