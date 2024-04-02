import { defineConfig } from 'vite';
import { imagetools } from 'vite-imagetools';
import { resolve } from 'path';

export default defineConfig({
  plugins: [imagetools()],
});
