"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Box, Button, Checkbox, Collapse, Fab, FormControlLabel, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useAddPlayerMutation, useGetPlayersQuery } from "@/redux/playersApi";
import { useResponsive } from "@/hooks/use-responsive";
import CustomLabeledBox from "@/components/box-label/custom-box-label";

export default function DashboardAddPlayer() {
  const isMobile = useResponsive("down", "sm")

  const [expandForm, setExpandForm] = useState(false);

  const [addPlayer, { isLoading }] = useAddPlayerMutation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [position, settPosition] = useState("");
  const [secondPosition, setSecondPosition] = useState("");
  const [besoccerLink, setBesoccerLink] = useState("");
  const [isClubPlayer, setIsClubPlayer] = useState(false)

  const handleExpandFormClick = () => {
    setExpandForm((prev) => {
      const isExpanding = !prev;
      return isExpanding;
    });
  };

  const handleChangeIsClubPlayerCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsClubPlayer(event.target.checked);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar los campos
    if (!firstName || !lastName || !position) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    try {
      await addPlayer({
        firstName,
        lastName,
        position,
        secondPosition,
        besoccer: besoccerLink,
        isClubPlayer
      });
      setFirstName("");
      setLastName("");
      settPosition("");
      setBesoccerLink("");
      setIsClubPlayer(false);
    } catch (error) {
      console.error("Error al agregar el jugador:", error);
    }
  };

  const renderForm = (
    <CustomLabeledBox label="Añadir jugador">
        <form onSubmit={handleSubmit}>
            <Stack direction={isMobile ? 'column' : 'row'} spacing={3} alignItems={'center'}>
              <Stack flex={1} spacing={3}>
                <Stack spacing={3} direction={isMobile ? 'column' : 'row'}>
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
                </Stack>

                <Stack spacing={3} direction={isMobile ? 'column' : 'row'}>
                  <TextField
                    select
                    label="Posición 433"
                    value={position}
                    onChange={(e) => settPosition(e.target.value)}
                    fullWidth
                    required
                  >
                      {/* Opciones de las posiciones */}
                      {[
                      "POR", // Portero
                      "DFD", // Defensa Derecho
                      "DFI", // Defensa Izquierdo
                      "LD",  // Lateral Derecho
                      "LI",  // Lateral Izquierdo
                      "PIV", // Pivote defensivo
                      "MCI", // Mediocentro Izquierdo
                      "MCD", // Mediocentro Derecho
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
                    disabled={["POR", "MCI", "MCD", "MCO"].includes(position)}
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
                </Stack>
                <Stack spacing={3} direction={isMobile ? 'column' : 'row'}>
                  <TextField
                      label="Bessocer"
                      value={besoccerLink}
                      onChange={(e) => setBesoccerLink(e.target.value)}
                      fullWidth
                      required
                      sx={{ flex: 1 }}
                  />

                  <FormControlLabel 
                    label={'Plantilla actual'}
                    sx={{ flex: 1 }}
                    control={
                    <Checkbox
                        checked={isClubPlayer}
                        onChange={handleChangeIsClubPlayerCheckbox}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                    }
                  />
                </Stack>
              </Stack>

            <Box>
                <Fab 
                    aria-label="add"
                    type="submit"
                    color="primary"
                    disabled={isLoading}
                >
                    {isLoading ? "Agregando..." : <Icon icon="mingcute:add-line" />}
                </Fab>
            </Box>
            </Stack>
        </form>
    </CustomLabeledBox>
  )

  return (
        <Stack spacing={3}>
            {!isMobile &&
            <Stack alignItems={'center'}>
                <Button 
                    aria-label="add"
                    onClick={handleExpandFormClick}
                    variant="text"
                    color="primary"
                    disabled={isLoading}
                    startIcon={<Icon icon={expandForm ? 'mingcute:minimize-line' : "mingcute:add-line"} />}
                    sx={{
                        textAlign: 'center'
                    }}
                >
                    Añadir jugador
                </Button>
            </Stack>}

            {isMobile ? renderForm : 
            <Collapse in={expandForm} timeout="auto" unmountOnExit>
                {renderForm}
            </Collapse>}
        </Stack>
  );
}