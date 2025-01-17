import Iconify from "@/components/iconify";
import { Player, useDeletePlayerMutation } from "@/redux/playersApi";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, Typography, useTheme } from "@mui/material";

type Props = {
    setOpenDeleteDialog: (value: boolean) => void;
    openDeleteDialog: boolean;
    selectedPlayer: Player | undefined;
}

export default function DeleteModal({
    setOpenDeleteDialog,
    openDeleteDialog,
    selectedPlayer,
}: Props) {
    const theme = useTheme()
    const [deletePlayer] = useDeletePlayerMutation();

    const handleDelete = async (id: string | undefined) => {
        if (id) {
            try {
                await deletePlayer(id).unwrap();
                setOpenDeleteDialog(false);
            } catch (error) {
                console.error("Error al eliminar el jugador:", error);
            }
        }
    };

    return(
        <Dialog
            fullWidth
            maxWidth="sm"
            open={openDeleteDialog || false}
            onClose={() => setOpenDeleteDialog(false)}
            scroll="paper"
        >
            <DialogTitle
                id="scroll-dialog-title"
                display="flex"
                justifyContent="space-between"
                padding={3}
            >
                Eliminar jugador
                <IconButton onClick={() => setOpenDeleteDialog(false)}>
                    <Iconify icon="mingcute:close-line" />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                ¿Está seguro que desea eliminar al jugador {selectedPlayer?.firstName} {selectedPlayer?.lastName}?
            </DialogContent>
            <DialogActions
                sx={{
                    display: 'flex',
                    justifyContent: 'end',
                }}
                >
                <Button variant="outlined" onClick={() => setOpenDeleteDialog(false)} sx={{ color: theme.palette.common.black, borderColor: theme.palette.common.black }}>
                    Cancelar
                </Button>
                <Button onClick={() => handleDelete(selectedPlayer?.id!)} variant="contained" color="error">
                    Eliminar
                </Button>
            </DialogActions>
        </Dialog>
    )
}