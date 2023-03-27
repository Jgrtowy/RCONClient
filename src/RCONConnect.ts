import axios from "axios"

interface data {
     ip: string
     port: number
     password: string
}

const RCONConnect = async (data: data, commandInput: string) => {
     const ip = data.ip
     const port = data.port
     const password = data.password
     const command = commandInput || "help"
     try {
          const response = await axios("https://api.jgrtowy.xyz/rcon", {
               method: "POST",
               data: {
                    ip,
                    port,
                    password,
                    command,
               },
               headers: {
                    "Content-Type": "application/json",
               },
          })
          return response
     } catch (error) {
          return false
     }
}
export default RCONConnect
