const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode(...chunk);
  }
  return btoa(binary);
};

const base64ToArrayBuffer = (base64: string) => {
  const binary = atob(base64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
};

export const generateSymmetricKey = () => {
  const key = crypto.getRandomValues(new Uint8Array(32));
  return arrayBufferToBase64(key.buffer);
};

export const encryptSymmetric = async (plaintext: string, key: string) => {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encodedPlaintext = new TextEncoder().encode(plaintext);

  const secretKey = await crypto.subtle.importKey(
    'raw',
    base64ToArrayBuffer(key),
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );

  const ciphertext = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    secretKey,
    encodedPlaintext
  );

  return {
    ciphertext: arrayBufferToBase64(ciphertext),
    iv: arrayBufferToBase64(iv.buffer)
  };
};

export const decryptSymmetric = async (ciphertext: string, iv: string, key: string) => {
  const secretKey = await crypto.subtle.importKey(
    'raw',
    base64ToArrayBuffer(key),
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );

  const decryptedArrayBuffer = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: new Uint8Array(base64ToArrayBuffer(iv)) },
    secretKey,
    base64ToArrayBuffer(ciphertext)
  );

  return new TextDecoder().decode(decryptedArrayBuffer);
};
