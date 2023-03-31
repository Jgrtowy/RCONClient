import {
     BuilderHandler,
     Handler,
     HandlerContext,
     HandlerEvent,
     HandlerResponse,
} from "@netlify/functions"
import axios from "axios"
import { config } from "dotenv"
config()

const handler: Handler = async (
     event: HandlerEvent,
     context: HandlerContext
) => {
     try {
          console.log(event.body)

          await axios.post(
               `https://api.jgrtowy.xyz/netlify?key=${process.env.NETLIFY_KEY}`,
               {
                    eventType: "deploy-building",
                    eventBody: JSON.parse(event.body || "{}"),
               },
               {
                    headers: {
                         "Content-Type": "Application/json",
                    },
               }
          )
     } catch (e) {
          return {
               statusCode: 500,
          }
     }

     return {
          statusCode: 200,
     }
}

export { handler }
