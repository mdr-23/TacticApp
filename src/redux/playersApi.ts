import { createApi } from '@reduxjs/toolkit/query/react';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export interface Player {
  id?: string; 
  firstName: string;
  lastName: string;
  firstPosition: string;
  secondPosition: string;
  besoccer: string;
  isClubPlayer: boolean;
}

export const playersApi = createApi({
  reducerPath: 'playersApi',
  baseQuery: async () => ({ data: {} }),
  tagTypes: ['Players'],
  endpoints: (builder) => ({
    // POST
    addPlayer: builder.mutation<{ id: string } & Player, Player>({
      queryFn: async (player) => {
        try {
          const docRef = await addDoc(collection(db, 'players'), player);
          return { data: { id: docRef.id, ...player } };
        } catch (error: any) {
          return { error: { message: error.message } };
        }
      },
      invalidatesTags: ['Players'],
    }),

    // GET
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
      providesTags: ['Players'],
    }),

    // DELETE
    deletePlayer: builder.mutation<void, string>({
      //@ts-ignore
      queryFn: async (playerId) => {
        console.log("Eliminando jugador con ID:", playerId);
    
        try {
          if (!playerId) {
            return { error: { message: "ID no proporcionado" } };
          }
    
          const playerRef = doc(db, 'players', playerId);
          await deleteDoc(playerRef);
    
          console.log("Jugador eliminado correctamente");
          return { data: null };
        } catch (error: any) {
          console.error("Error al eliminar jugador:", error);
          return { error: { message: error.message } };
        }
      },
      invalidatesTags: ['Players'],
    }),

    // UPDATE
    updatePlayer: builder.mutation<Player, { playerId: string | undefined; playerData: Partial<Player> }>({
      //@ts-ignore
      queryFn: async ({ playerId, playerData }) => {
        console.log("Editando jugador con ID:", playerId);
    
        try {
          if (!playerId) {
            return { error: { message: "ID no proporcionado" } };
          }
    
          const playerRef = doc(db, 'players', playerId);
          await updateDoc(playerRef, playerData); // Actualizar los datos del jugador
    
          console.log("Jugador actualizado correctamente");
          return { data: { id: playerId, ...playerData } };
        } catch (error: any) {
          console.error("Error al editar jugador:", error);
          return { error: { message: error.message } };
        }
      },
      invalidatesTags: ['Players'],
    }),
  }),
});

export const { useAddPlayerMutation, useGetPlayersQuery, useDeletePlayerMutation, useUpdatePlayerMutation } = playersApi;