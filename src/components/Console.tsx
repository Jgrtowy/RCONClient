import { AxiosResponse } from "axios"
import React, { useEffect, useRef, useState } from "react"
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
               const data: string = res.data

               if (data == "\u001b[0m") {
                    console.log("No response")
               } else {
                    setResponse([
                         ...responses,
                         `[${date.toLocaleTimeString()}]   ${data.replace(
                              "\u001b[0m",
                              ""
                         )}`,
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

     const divRef = useRef<HTMLDivElement>(null)

     useEffect(() => {
          divRef.current?.scrollBy(0, divRef.current.scrollHeight)
     }, [responses])

     return (
          <div className="w-screen flex justify-center text-center flex-col h-screen items-center gap-5">
               <div className="absolute top-5 right-5">
                    <button
                         onClick={handleLogOut}
                         className="border transition border-gray-50 rounded-lg py-1 px-2 bg-white dark:bg-gray-900 text-black dark:text-white dark:hover:bg-gray-600"
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
                              placeholder="Press enter to send command"
                              onChange={handleInputChange}
                              className="border transition w-1/2 border-gray-50 rounded-lg py-1 px-2 bg-white dark:bg-gray-900 text-black dark:text-white dark:focus:bg-gray-700 outline-none"
                         />
                    </form>
               </div>
               <div
                    className="border w-3/4 h-52 border-gray-50 rounded-lg py-1 px-2 bg-white dark:bg-gray-900 text-black dark:text-white outline-none text-sm overflow-y-auto overflow-x-hidden text-left flex flex-col"
                    ref={divRef}
               >
                    {responses.map((response, index) => (
                         <code key={index}>{response}</code>
                    ))}
               </div>
               <button
                    onClick={() => setResponse([])}
                    className="border transition border-gray-50 rounded-lg py-1 px-2 bg-white dark:bg-gray-900 text-black dark:text-white dark:hover:bg-gray-600"
               >
                    Clear Console
               </button>
          </div>
     )
}
