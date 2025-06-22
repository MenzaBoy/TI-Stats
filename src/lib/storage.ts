// src/lib/db.ts
import { db } from './firebase';
import { ref, set, get } from 'firebase/database';

export async function saveGame(gameId: string, data: any) {
  await set(ref(db, `games/${gameId}`), data);
}

export async function loadGame(gameId: string): Promise<any | null> {
  const snapshot = await get(ref(db, `games/${gameId}`));
  return snapshot.exists() ? snapshot.val() : null;
}
