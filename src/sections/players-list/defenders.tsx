import { Player } from "@/redux/playersApi"
import { Avatar, Box, IconButton, Stack, Typography, useTheme } from "@mui/material";
import { PositionKey, positionColors } from "../utils/constants";
import { Icon } from "@iconify/react/dist/iconify.js";

type Props = {
    data: Player[] | undefined;
    setOpenDeleteDialog: (value: boolean) => void;
    setSelectedPlayer: (value: Player) => void;
}

export default function Defenders({ data, setOpenDeleteDialog, setSelectedPlayer }: Props) {
    const theme = useTheme()

    const userClick = (player: Player) => {
        if (player.besoccer) {
            window.open(player.besoccer, '_blank', 'noopener,noreferrer');
        } else {
            console.warn("El jugador no tiene un enlace válido");
        }
    };

    const onDelete = (player: Player) => {
        setSelectedPlayer(player);
        setOpenDeleteDialog(true);
    }

    return(
        <Stack spacing={2}>
            <Typography variant="subtitle2">Defensas</Typography>
            {data?.map(player => (
                (player.position === "DFD" ||
                player.position === "DFI" ||
                player.position === "LD" ||
                player.position === "LI") &&
                <Stack 
                    key={player.id} 
                    direction={'row'} 
                    alignItems={'center'}
                    justifyContent={"space-between"}
                    sx={{
                        cursor: 'pointer',
                        minWidth: 0,
                        marginRight: 2,
                        padding: 1,
                        borderRadius: 2,
                        '&:hover': {
                          backgroundColor: theme.palette.action.hover,
                        },
                      }}
                >
                    <Stack direction={'row'} alignItems={'center'} spacing={1} onClick={() => userClick(player)}>
                        <Avatar sx={{ bgcolor: positionColors[player.position as PositionKey], fontSize: '12px' }}>
                            {player.position}
                        </Avatar>

                        <Stack>
                            <Typography 
                                variant="body2"
                                sx={{
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    maxWidth: "130px",
                                }}    
                            >
                                {player.firstName} {player.lastName}
                            </Typography>

                            <Typography variant="caption" color="text.secondary">
                                {player.isClubPlayer ? "Plantilla actual" : "En seguimiento"}
                            </Typography>
                        </Stack>
                    </Stack>

                    <Stack direction={'row'} alignItems={'center'}>
                        <Box>
                            <IconButton size="small">
                                <Icon icon="mingcute:pencil-fill" />
                            </IconButton>
                        </Box>

                        <Box>
                            <IconButton size="small" onClick={() => onDelete(player)}>
                                <Icon icon="mingcute:delete-2-fill" color={theme.palette.error.main} />
                            </IconButton>
                        </Box>
                    </Stack>
                </Stack>
            ))}
        </Stack>
    )
    
}