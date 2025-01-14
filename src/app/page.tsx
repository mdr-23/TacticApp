"use client";

import ThemeSwitch from "@/components/theme/theme-switch";
import { useResponsive } from "@/hooks/use-responsive";
import { useAddPlayerMutation, useGetPlayersQuery } from "@/redux/playersApi";
import Field from "@/sections/field";
import PlayersList from "@/sections/players-list/players-list";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Box, Button, Checkbox, Fab, FormControlLabel, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function Home() {
  const isMobile = useResponsive("down", "sm")
  const { data } = useGetPlayersQuery();
  const [addPlayer, { isLoading }] = useAddPlayerMutation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [position, setPosition] = useState("");
  const [besoccerLink, setBesoccerLink] = useState("");
  const [isClubPlayer, setIsClubPlayer] = useState(false)

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
        besoccer: besoccerLink,
        isClubPlayer
      });
      // Resetear el formulario si se agrega exitosamente
      setFirstName("");
      setLastName("");
      setPosition("");
      setBesoccerLink("");
      setIsClubPlayer(false);
    } catch (error) {
      console.error("Error al agregar el jugador:", error);
    }
  };

  return (
    <Stack spacing={3} padding={isMobile ? 0 : 5}>
      <Box display={'flex'} justifyContent={'flex-end'}>
        <ThemeSwitch />
      </Box>
      <Typography variant="h3" textAlign={'center'}>
        TacticApp
      </Typography>

      <Stack direction={'column'} spacing={3}>
          <form onSubmit={handleSubmit}>
            <Stack direction={isMobile ? 'column' : 'row'} spacing={2} alignItems={'center'}>
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
                label="Posición"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
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

        {!isMobile &&
        <Stack alignItems={'center'}>
          <Field />
        </Stack>}

        <PlayersList data={data} />
      </Stack>
    </Stack>
  );
}