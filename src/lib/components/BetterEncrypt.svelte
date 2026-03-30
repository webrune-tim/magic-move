<script lang="ts">
  import { encryptSymmetric, decryptSymmetric, generateSymmetricKey } from './encrypt.ts';

  let plaintext = $state('The quick brown fox jumps over the lazy dog');
  let key = $state(generateSymmetricKey());
  let ciphertext = $state('');
  let iv = $state('');
  let decrypted = $state('');
  let status = $state('');

  const encrypt = async () => {
    status = '';
    try {
      const payload = await encryptSymmetric(plaintext, key);
      ciphertext = payload.ciphertext;
      iv = payload.iv;
      decrypted = '';
      status = 'Encrypted successfully.';
    } catch (error) {
      status = `Encryption error: ${(error as Error).message}`;
    }
  };

  const decrypt = async () => {
    status = '';
    try {
      if (!ciphertext || !iv) {
        throw new Error('ciphertext and iv are required');
      }
      decrypted = await decryptSymmetric(ciphertext, iv, key);
      status = 'Decrypted successfully.';
    } catch (error) {
      decrypted = '';
      status = `Decryption error: ${(error as Error).message}`;
    }
  };

  const generateKey = () => {
    key = generateSymmetricKey();
    status = 'New key generated.';
  };
</script>

<section class="card max-w-3xl mx-auto">
  <h2 class="card-header">Symmetric Encryption (AES-GCM)</h2>

  <div class="card-field">
    <label class="card-label">Plaintext</label>
    <textarea class="card-textarea" rows="4" bind:value={plaintext}></textarea>
  </div>

  <div class="card-field">
    <label class="card-label">Base64 Key</label>
    <input class="card-input" type="text" bind:value={key} />
  </div>

  <div class="flex flex-wrap gap-3 mb-4">
    <button class="card-button" onclick={generateKey}>Generate Key</button>
    <button class="card-button-primary" onclick={encrypt}>Encrypt</button>
    <button class="card-button-primary" onclick={decrypt}>Decrypt</button>
  </div>

  <div class="card-field">
    <label class="card-label">Ciphertext (Base64)</label>
    <textarea readonly class="card-textarea" rows="4" bind:value={ciphertext}></textarea>
  </div>

  <div class="card-field">
    <label class="card-label">IV (Base64)</label>
    <input class="card-input" readonly type="text" bind:value={iv} />
  </div>

  <div class="card-field">
    <label class="card-label">Decrypted Text</label>
    <textarea readonly class="card-textarea" rows="4" bind:value={decrypted}></textarea>
  </div>

  <p class="text-sm"><strong>Status:</strong> {status}</p>
</section>
 