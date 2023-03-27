import React, { useState } from "react"
import RCONConnect from "../RCONConnect"

export default function Console({ handleLogOut }: any, data: any) {
     const [command, setCommand] = useState("")

     const [responses, setResponse] = useState<string[]>([])
     const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          const { value } = event.target
          setCommand(value)
     }

     interface requestData {
          ip: string
          port: number
          password: string
          command: string
     }

     const handleSubmit = (
          event: React.FormEvent<HTMLFormElement>,
          creds: any
     ) => {
          const date = new Date()
          event.preventDefault()
          RCONConnect(creds, command).then((res: any) => {
               if (res.data == "\u001b[0m") {
                    console.log("No response")
               } else {
                    setResponse([
                         ...responses,
                         `[${date.toLocaleTimeString()}]   ${res.data}`,
                    ])
               }
          })
          event.currentTarget.reset()
     }

     const [creds] = useState({
          ip: data.ip || localStorage.getItem("ip"),
          port: data.port || localStorage.getItem("port"),
          password: data.password || localStorage.getItem("password"),
     })

     return (
          <div className="w-screen flex justify-center text-center flex-col h-screen items-center gap-5">
               <div className="absolute top-5 right-5">
                    <button
                         onClick={handleLogOut}
                         className="border border-gray-50 rounded-lg py-1 px-2 bg-white dark:bg-gray-900 text-black dark:text-white dark:hover:bg-gray-600"
                    >
                         Log out
                    </button>
               </div>
               <h1 className=" text-2xl">✅ Connection established!</h1>
               <div className="w-screen">
                    <form
                         onSubmit={(e) => handleSubmit(e, creds)}
                         className="w-screen"
                    >
                         <input
                              type="text"
                              name="command"
                              onChange={handleInputChange}
                              className="border w-1/2 border-gray-50 rounded-lg py-1 px-2 bg-white dark:bg-gray-900 text-black dark:text-white dark:focus:bg-gray-700 outline-none"
                         />
                    </form>
               </div>
               <div className="border w-3/4 h-40 border-gray-50 rounded-lg py-1 px-2 bg-white dark:bg-gray-900 text-black dark:text-white outline-none h-52 text-sm overflow-y-auto overflow-x-hidden text-left flex flex-col">
                    {responses.map((response, index) => (
                         <>
                              <code key={index}>{response}</code>
                              <br />
                         </>
                    ))}
               </div>
               <button
                    onClick={() => setResponse([])}
                    className="border border-gray-50 rounded-lg py-1 px-2 bg-white dark:bg-gray-900 text-black dark:text-white dark:hover:bg-gray-600"
               >
                    Clear Console
               </button>
          </div>
     )
}
