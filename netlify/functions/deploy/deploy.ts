import { Handler } from "@netlify/functions"
import axios from "axios"
import dotenv from "dotenv"
dotenv.config()

interface DeployStatusData {
     key?: string
     status?: string
     site_id?: string
     deploy_id?: string
     deploy_url?: string
     commit_ref?: string
     branch?: string
     commit_message?: string
     user_agent?: string
}

const handler: Handler = async (event, context) => {
     const queryStringParameters = event.queryStringParameters
     let id

     if (queryStringParameters && queryStringParameters.id) {
          id = queryStringParameters.id
     }

     const data: DeployStatusData = {
          status: event.headers["x-netlify-status"],
          site_id: event.headers["x-netlify-site-id"],
          deploy_id: event.headers["x-netlify-deploy-id"],
          deploy_url: event.headers["x-netlify-deploy-url"],
          commit_ref: event.headers["x-netlify-commit-ref"],
          branch: event.headers["x-netlify-branch"],
          commit_message: event.headers["x-netlify-commit-message"],
          user_agent: event.headers["user-agent"],
     }

     try {
          const response = await axios.post(
               `http://localhost:5000/netlify`,
               data,
               {
                    headers: {
                         "Content-Type": "application/json",
                    },
               }
          )

          if (response.status !== 200) {
               return {
                    statusCode: response.status,
                    body: `Failed to send deploy status data to API: ${response.statusText}`,
               }
          }

          return {
               statusCode: 200,
               body: "Deploy status data sent to API successfully",
          }
     } catch (error) {
          console.error(error)
          return {
               statusCode: 500,
               body: "Failed to send deploy status data to API",
          }
     }
}

export { handler }
