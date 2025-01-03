import { createApi } from '@reduxjs/toolkit/query/react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

// Tipos de los datos
interface Player {
  id?: string; // El ID se agrega automáticamente al leer datos de Firestore
  firstName: string;
  lastName: string;
  position: string;
  besoccer: string;
  isClubPlayer: boolean;
}

export const playersApi = createApi({
  reducerPath: 'playersApi',
  baseQuery: async () => ({ data: {} }),
  tagTypes: ['Players'], // Definir las tags disponibles
  endpoints: (builder) => ({
    // Endpoint para agregar un jugador (POST)
    addPlayer: builder.mutation<{ id: string } & Player, Player>({
      queryFn: async (player) => {
        try {
          const docRef = await addDoc(collection(db, 'players'), player);
          return { data: { id: docRef.id, ...player } };
        } catch (error: any) {
          return { error: { message: error.message } };
        }
      },
      // Invalidar la tag 'Players' al agregar un jugador
      invalidatesTags: ['Players'],
    }),

    // Endpoint para obtener todos los jugadores (GET)
    getPlayers: builder.query<Player[], void>({
      async queryFn() {
        try {
          const querySnapshot = await getDocs(collection(db, 'players'));
          const players: Player[] = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Player[];
          return { data: players };
        } catch (error: any) {
          return { error: { message: error.message } };
        }
      },
      // Asociar la tag 'Players' al endpoint getPlayers
      providesTags: ['Players'],
    }),
  }),
});

export const { useAddPlayerMutation, useGetPlayersQuery } = playersApi;