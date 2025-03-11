import { Box, Link, Stack, Typography } from "@mui/material";

// Componente para cada ficha circular (PlayerCircle)
export default function FieldPlayers({
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
        <Typography variant="body1">{position}</Typography>
  
        <Box
          sx={{
            position: "absolute",
            top: 70,
            textAlign: "center",
            bgcolor: "#000000c7",
            width: players.length > 4 ? '200px' : '100px',
            borderRadius: 2,
            paddingY: 1,
            display: "flex",
            flexDirection: players.length > 4 ? "row" : "column",
            justifyContent: "space-around",
          }}
        >
          {[players.slice(0, 4), players.slice(4)].map((column, columnIndex) => (
            <Stack key={columnIndex}>
              {column.map((player) => (
                <Link
                  key={player.id}
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
              ))}
            </Stack>
          ))}
        </Box>
      </Box>
    );
  }