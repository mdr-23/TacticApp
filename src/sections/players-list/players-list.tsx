import { Player } from "@/redux/playersApi"
import { Box, Stack, Typography } from "@mui/material";
import Goalkeepers from "./goalkeepers";
import { useState } from "react";
import DeleteModal from "../delete-modal";
import Defenders from "./defenders";
import Midfielders from "./midfielders";
import Forwards from "./forwards";
import { useResponsive } from "@/hooks/use-responsive";

type Props = {
    data: Player[] | undefined;
}

export default function PlayersList({ data }: Props) {
    const isMobile = useResponsive("down", "sm")
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
    const [selectedPlayer, setSelectedPlayer] = useState<Player | undefined>()

    return(
        <>
            <Typography variant="h4" textAlign={'center'}>
                Lista de jugadores
            </Typography>

            <Stack direction={isMobile ? 'column' : 'row'} width={1} justifyContent={'space-between'} spacing={2}>
                <Box sx={{ flex: 1 }}>
                    <Goalkeepers 
                        data={data} 
                        setOpenDeleteDialog={setOpenDeleteDialog}
                        setSelectedPlayer={setSelectedPlayer}
                    />
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Defenders 
                        data={data} 
                        setOpenDeleteDialog={setOpenDeleteDialog}
                        setSelectedPlayer={setSelectedPlayer}
                    />
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Midfielders 
                        data={data} 
                        setOpenDeleteDialog={setOpenDeleteDialog}
                        setSelectedPlayer={setSelectedPlayer}
                    />
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Forwards 
                        data={data} 
                        setOpenDeleteDialog={setOpenDeleteDialog}
                        setSelectedPlayer={setSelectedPlayer}
                    />
                </Box>

                {openDeleteDialog &&
                    <DeleteModal
                        setOpenDeleteDialog={setOpenDeleteDialog}
                        openDeleteDialog={openDeleteDialog}
                        selectedPlayer={selectedPlayer}
                    />
                }            
            </Stack>
        </>
    )
}