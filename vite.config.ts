import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createServer } from 'net'

function findAvailablePort(startPort: number): Promise<number> {
  return new Promise((resolve, reject) => {
    const server = createServer();
    server.listen(startPort, () => {
      server.close(() => resolve(startPort));
    });
    server.on('error', () => {
      resolve(findAvailablePort(startPort + 1));
    });
  });
}

export default defineConfig(async () => {
  const port = await findAvailablePort(3006);

  return {
    plugins: [react()],
    server: {
      port,
      strictPort: false,
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          secure: false,
        },
      },
    },
    preview: {
      port,
      strictPort: false,
    },
  }
})