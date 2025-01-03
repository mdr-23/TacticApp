"use client";

import { useGetPlayersQuery } from "@/redux/playersApi";
import { Box, Typography, Stack, Link } from "@mui/material";
import { useState } from "react";

type PositionKey = "POR" | "DFD" | "DFI" | "LD" | "LI" | "PIV" | "MCI" | "MCD" | "ED" | "EI" | "DC";

const positionColors: Record<PositionKey, string> = {
  POR: "#d09900",
  DFI: "#2036b0",
  DFD: "#2036b0",
  LD: "#2036b0",
  LI: "#2036b0",
  MCI: "#2036b0",
  MCD: "#2036b0",
  ED: "#2036b0",
  EI: "#2036b0",
  DC: "#2036b0",
  PIV: "#2036b0",
};


const initialPositions: Record<PositionKey, { x: number; y: number }> = {
    POR: { x: 100, y: 333 },
    DFD: { x: 250, y: 420 },
    DFI: { x: 250, y: 250 },
    LD: { x: 250, y: 560 },
    LI: { x: 250, y: 105 },
    PIV: { x: 400, y: 333 },
    MCI: { x: 530, y: 203 },
    MCD: { x: 530, y: 463 },
    ED: { x: 770, y: 560 },
    EI: { x: 770, y: 105 },
    DC: { x: 933, y: 333 },
  };

export default function Field() {
  const { data: players } = useGetPlayersQuery();
  const [positions] = useState(initialPositions);

  return (
    <Stack spacing={4} padding={3}>

      {/* Cancha */}
      <Box
        id="field"
        sx={{
            position: "relative",
            width: 1122,
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
                        color: !player.isClubPlayer ? 'common.white' : 'info.light',
                        "&:hover": {
                        textDecoration: 'none',
                        color: !player.isClubPlayer ? 'grey.300' : 'info.main',
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