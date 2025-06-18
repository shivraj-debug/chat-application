import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server:{¸
  //   port:5173,
  //   proxy:{
  //     "/api":{
  //       target:"http://localhost:3000",
  //     }
  //   }
  // }
  // resolve: {
  //   alias: {
  //     "@": path.resolve(__dirname, "./src"),
  //   },
  // },
})
