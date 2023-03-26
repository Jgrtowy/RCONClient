import axios from "axios"

interface data {
     ip: string
     port: number
     password: string
}

const RCONConnect = async (data: data) => {
     const ip = data.ip
     const port = data.port
     const password = data.password
     const command = ""
     console.log(data)
     try {
          await axios("/rcon", {
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
     } catch (error) {
          return false
     }
     return true
}
export default RCONConnect
