import { Box, Stack, Typography, useTheme } from "@mui/material";
import Goalkeepers from "./goalkeepers";
import { useState } from "react";
import DeleteModal from "./modal/delete-modal";
import Defenders from "./defenders";
import Midfielders from "./midfielders";
import Forwards from "./forwards";
import { useResponsive } from "@/hooks/use-responsive";
import { Player } from "@/redux/playersApi";
import UpdateModal from "./modal/update-modal";

type Props = {
    data: Player[] | undefined;
}

export default function PlayersList({ data }: Props) {
    const isMobile = useResponsive("down", "sm")
    const theme = useTheme()
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
    const [openEditDialog, setOpenEditDialog] = useState(false)
    const [selectedPlayer, setSelectedPlayer] = useState<Player | undefined>()

    return(
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
                Lista de jugadores
            </Typography>

            <Stack direction={isMobile ? 'column' : 'row'} width={1} justifyContent={'space-between'} spacing={2}>
                <Box sx={{ flex: 1 }}>
                    <Goalkeepers 
                        data={data} 
                        setOpenDeleteDialog={setOpenDeleteDialog}
                        setSelectedPlayer={setSelectedPlayer}
                        setOpenEditDialog={setOpenEditDialog}
                    />
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Defenders 
                        data={data} 
                        setOpenDeleteDialog={setOpenDeleteDialog}
                        setSelectedPlayer={setSelectedPlayer}
                        setOpenEditDialog={setOpenEditDialog}
                    />
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Midfielders 
                        data={data} 
                        setOpenDeleteDialog={setOpenDeleteDialog}
                        setSelectedPlayer={setSelectedPlayer}
                        setOpenEditDialog={setOpenEditDialog}
                    />
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Forwards 
                        data={data} 
                        setOpenDeleteDialog={setOpenDeleteDialog}
                        setSelectedPlayer={setSelectedPlayer}
                        setOpenEditDialog={setOpenEditDialog}
                    />
                </Box>

                {openDeleteDialog &&
                    <DeleteModal
                        setOpenDeleteDialog={setOpenDeleteDialog}
                        openDeleteDialog={openDeleteDialog}
                        selectedPlayer={selectedPlayer}
                    />
                }
                {openEditDialog &&
                    <UpdateModal
                        setOpenEditDialog={setOpenEditDialog}
                        openEditDialog={openEditDialog}
                        selectedPlayer={selectedPlayer}
                    />
                }                 
            </Stack>
        </Stack>
    )
}