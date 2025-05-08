import { env } from "@env/index"
import { app } from "./fastify/app"

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log(`🚀 HTTP Server Running on ${env.PORT}`)
  })
