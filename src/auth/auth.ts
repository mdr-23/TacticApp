import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from 'firebaseConfig';

export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user;
  } catch (error) {
    throw error; // Aquí puedes manejar los errores o enviarlos al contexto
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};