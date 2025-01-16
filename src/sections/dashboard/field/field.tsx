"use client";

import { Box, Typography, Stack, Link } from "@mui/material";
import { useState } from "react";
import { PositionKey, positionColors } from "../../utils/constants";
import { useGetPlayersQuery } from "@/redux/playersApi";

const initialPositions: Record<PositionKey, { x: number; y: number }> = {
    POR: { x: 100, y: 333 },
    DFD: { x: 250, y: 420 },
    DFI: { x: 250, y: 238 },
    LD: { x: 250, y: 580 },
    LI: { x: 250, y: 88 },
    MCO: { x: 750, y: 333 },
    MCI: { x: 500, y: 203 },
    MCD: { x: 500, y: 463 },
    ED: { x: 870, y: 560 },
    EI: { x: 870, y: 105 },
    DC: { x: 1033, y: 333 },
  };

export default function Field() {
  const { data: players } = useGetPlayersQuery();
  const [positions] = useState(initialPositions);

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
        {(Object.keys(positionColors) as PositionKey[]).map((position) => (
          <PlayerCircle
            key={position}
            position={position}
            players={players?.filter((p) => p.position === position) || []}
            color={positionColors[position]}
            x={positions[position].x}
            y={positions[position].y}
          />
        ))}
      </Box>
    </Stack>
  );
}

// Componente para cada ficha circular (PlayerCircle)
function PlayerCircle({
  position,
  players,
  color,
  x,
  y,
}: {
  position: string;
  players: { id?: string; firstName: string; lastName: string; besoccer: string, isClubPlayer: boolean }[];
  color: string;
  x: number;
  y: number;
}) {
  return (
    <Box
      sx={{
        position: "absolute",
        top: y,
        left: x,
        width: 60,
        height: 60,
        borderRadius: "50%",
        background: color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
      }}
    >
      {/* Nombre de la posición */}
      <Typography variant="body1">{position}</Typography>

      {/* Lista de jugadores */}
      <Box sx={{ position: "absolute", top: 70, textAlign: "center", bgcolor: "#000000c7", width: '100px', borderRadius: 2, paddingY: 1 }}>
        {players.map((player) => (
            <Stack 
                key={player.id}
            >
                <Link
                    href={player.besoccer}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                        cursor: 'pointer',
                        textDecoration: 'none',
                        color: !player.isClubPlayer ? 'common.white' : 'info.main',
                        "&:hover": {
                          textDecoration: 'none',
                          color: !player.isClubPlayer ? 'grey.300' : 'info.dark',
                        },
                    }}
                >
                    <Typography variant="body2">
                        {`${player.firstName.charAt(0)}. ${player.lastName}`}
                    </Typography>
                </Link>
            </Stack>
        ))}
      </Box>
    </Box>
  );
}