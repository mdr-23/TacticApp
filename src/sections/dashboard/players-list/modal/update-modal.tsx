import Iconify from "@/components/iconify";
import { useResponsive } from "@/hooks/use-responsive";
import { Player, useDeletePlayerMutation, useUpdatePlayerMutation } from "@/redux/playersApi";
import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Fab, FormControlLabel, IconButton, MenuItem, Stack, TextField, Typography, useTheme } from "@mui/material";
import { useState } from "react";

type Props = {
    setOpenEditDialog: (value: boolean) => void;
    openEditDialog: boolean;
    selectedPlayer: Player | undefined;
}

export default function UpdateModal({
    setOpenEditDialog,
    openEditDialog,
    selectedPlayer,
}: Props) {
    const theme = useTheme()
    const isMobile = useResponsive("down", "sm")

    const [updatePlayer] = useUpdatePlayerMutation();

    const [firstName, setFirstName] = useState(selectedPlayer?.firstName);
    const [lastName, setLastName] = useState(selectedPlayer?.lastName);
    const [position, setPosition] = useState(selectedPlayer?.position);
    const [secondPosition, setSecondPosition] = useState(selectedPlayer?.secondPosition);
    const [besoccerLink, setBesoccerLink] = useState(selectedPlayer?.besoccer);
    const [isClubPlayer, setIsClubPlayer] = useState(selectedPlayer?.isClubPlayer)

    const handleChangeIsClubPlayerCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsClubPlayer(event.target.checked);
      };

    const handleUpdate = async () => {
        try {
          const playerData = { firstName, lastName, position, besoccerLink, isClubPlayer };
          await updatePlayer({ playerId: selectedPlayer?.id, playerData }).unwrap();
          setOpenEditDialog(false);
        } catch (error) {
            console.error('Error al actualizar jugador:', error);
        }
      };

    return(
        <Dialog
            fullWidth
            maxWidth="xs"
            open={openEditDialog || false}
            onClose={() => setOpenEditDialog(false)}
            scroll="paper"
        >
            <DialogTitle
                id="scroll-dialog-title"
                display="flex"
                justifyContent="space-between"
                padding={3}
            >
                Editar jugador
                <IconButton onClick={() => setOpenEditDialog(false)}>
                    <Iconify icon="mingcute:close-line" />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Stack direction={'column'} spacing={3} marginTop={1}>
                    <TextField
                        label="Nombre"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Apellido"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        fullWidth
                        required
                    />

                    <TextField
                        select
                        label="Posición 433"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        fullWidth
                        required
                        >
                            {[
                            "POR", // Portero
                            "DFD", // Defensa Derecho
                            "DFI", // Defensa Izquierdo
                            "LD",  // Lateral Derecho
                            "LI",  // Lateral Izquierdo
                            "MCI", // Mediocentro Izquierdo
                            "MCD", // Mediocentro Derecho
                            "MCO", // Mediocentro Ofensivo
                            "ED",  // Extremo Derecho
                            "EI",  // Extremo Izquierdo
                            "DC",  // Delantero Centro
                            ].map((positionOption) => (
                            <MenuItem key={positionOption} value={positionOption}>
                                {positionOption}
                            </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                        select
                        label="Posición 352"
                        value={secondPosition}
                        onChange={(e) => setSecondPosition(e.target.value)}
                        fullWidth
                        disabled={["POR", "MCI", "MCD", "MCO"].includes(position ? position : "0")}
                    >
                      {/* Opciones de las posiciones */}
                      {[
                      "POR",
                      "DFD", 
                      "DFC",
                      "DFI",
                      "MCI", 
                      "MCD", 
                      "MD", 
                      "MI", 
                      "MCO", 
                      "DLD",
                      "DLI",
                      ].map((positionOption) => (
                      <MenuItem key={positionOption} value={positionOption}>
                          {positionOption}
                      </MenuItem>
                      ))}
                  </TextField>
                    <TextField
                        label="Bessocer"
                        value={besoccerLink}
                        onChange={(e) => setBesoccerLink(e.target.value)}
                        fullWidth
                        required
                    />

                    <FormControlLabel
                        label={'Plantilla actual'}
                        control={
                            <Checkbox
                                checked={isClubPlayer}
                                onChange={handleChangeIsClubPlayerCheckbox}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        }
                    />
                </Stack>
            </DialogContent>
            <DialogActions
                sx={{
                    display: 'flex',
                    justifyContent: 'end',
                }}
                >
                <Button variant="outlined" onClick={() => setOpenEditDialog(false)} sx={{ color: theme.palette.common.black, borderColor: theme.palette.common.black }}>
                    Cancelar
                </Button>
                <Button onClick={handleUpdate} variant="contained" sx={{ bgcolor: theme.palette.common.black }}>
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    )
}