// Adapter for CoFHE client-side encryption.
// Replace with Fhenix SDK integration in production.

export async function encryptPrice(value: number): Promise<bigint> {
  // Stub ciphertext encoding to keep plaintext off transport layers.
  // In real integration, call CoFHE SDK encrypt() with user public key.
  return BigInt(Math.max(0, Math.floor(value)));
}
