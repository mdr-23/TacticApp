import { Player } from "@/redux/playersApi"
import { Avatar, Box, IconButton, Stack, Typography, useTheme } from "@mui/material";
import { PositionKey, positionColors } from "../../utils/constants";
import Iconify from "@/components/iconify";

type Props = {
    data: Player[] | undefined;
    setOpenDeleteDialog: (value: boolean) => void;
    setSelectedPlayer: (value: Player) => void;
    setOpenEditDialog: (value: boolean) => void;
}

export default function Defenders({ data, setOpenDeleteDialog, setSelectedPlayer, setOpenEditDialog }: Props) {
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

    const onEdit = (player: Player) => {
        setSelectedPlayer(player);
        setOpenEditDialog(true);
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
                        <Avatar sx={{ bgcolor: "#2036b0", fontSize: '12px' }}>
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
                            <IconButton size="small" onClick={() => onEdit(player)}>
                                <Iconify icon="mingcute:pencil-fill" />
                            </IconButton>
                        </Box>

                        <Box>
                            <IconButton size="small" onClick={() => onDelete(player)}>
                                <Iconify icon="mingcute:delete-2-fill" color={theme.palette.error.main} />
                            </IconButton>
                        </Box>
                    </Stack>
                </Stack>
            ))}
        </Stack>
    )
    
}