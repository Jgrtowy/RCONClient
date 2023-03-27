import axios from "axios"
import { useEffect, useState } from "react"

const APIStatus = () => {
     const [status, setStatus] = useState("⏱️ Connecting...")
     const [time, setTime] = useState("")
     useEffect(() => {
          const startTime = performance.now()
          ;(async () => {
               try {
                    await axios.get("https://api.jgrtowy.xyz/status")
                    // await axios.get("http://localhost:5000/status")
                    setStatus(`✅ Working!`)
                    setTime(
                         `Took: ${(performance.now() - startTime).toFixed(2)}ms`
                    )
               } catch (e) {
                    setStatus("❌ Not working")
               }
          })()
     }, [])
     return (
          <div className="flex flex-col text-center">
               <h1 className="text-xl">API Status: {status}</h1>
               <h1 className="text-lg">{time}</h1>
          </div>
     )
}

export default APIStatus
