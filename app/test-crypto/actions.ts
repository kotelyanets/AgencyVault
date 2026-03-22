'use server'

import { encrypt, decrypt } from '@/lib/encryption';

export async function processCrypto(text: string) {
  try {
    const hash = encrypt(text);
    const decrypted = decrypt(hash);
    return { success: true, hash, decrypted };
  } catch (e: any) {
    return { success: false, error: e.message || 'Encryption failed' };
  }
}
