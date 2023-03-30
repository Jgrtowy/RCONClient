import React, { useEffect, useRef, useState } from "react"
import RCONConnect from "../RCONConnect"
import options from "./options.json"

export default function Console({ handleLogOut }: any, data: any) {
     const [command, setCommand] = useState("")
     const [responses, setResponse] = useState<string[]>([])
     const [suggestions, setSuggestions] = useState<string[]>([])
     const inputRef = useRef<HTMLInputElement>(null)

     useEffect(() => {
          if (inputRef.current) {
               inputRef.current.focus()
          }
     }, [])

     const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          setCommand(event.target.value)
          if (event.target.value.length < 1) return setSuggestions([])
          const filteredOptions = options.filter(
               (option) =>
                    option
                         .toLowerCase()
                         .indexOf(event.currentTarget.value.toLowerCase()) !==
                    -1
          )
          if (filteredOptions.length > 5)
               return setSuggestions(filteredOptions.slice(0, 5))
          setSuggestions(sortOptions(filteredOptions))
     }
     const sortOptions = (options: string[]) => {
          const sortedOptions = options.sort((a, b) => {
               if (a.startsWith(command) && b.startsWith(command)) {
                    return a.length - b.length
               }
               if (a.startsWith(command)) {
                    return -1
               }
               if (b.startsWith(command)) {
                    return 1
               }
               return 0
          })
          return sortedOptions
     }

     const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
          if (event.key === "Tab" && suggestions.length > 0) {
               event.preventDefault()
               setCommand(suggestions[0])
               setSuggestions([])
          }
     }
     const handleSuggestionClick = (event: React.MouseEvent<HTMLLIElement>) => {
          setCommand(event.currentTarget.innerText)
          setSuggestions([])
     }
     // submit handler
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
                         `[${date.toLocaleTimeString()}]   ${data}`,
                    ])
               }
          })
          setCommand("")
          setSuggestions([])
          event.currentTarget.reset()
     }
     // Credentials
     const [creds] = useState({
          ip: data.ip || localStorage.getItem("ip"),
          port: data.port || localStorage.getItem("port"),
          password: data.password || localStorage.getItem("password"),
     })

     // div ref

     const divRef = useRef<HTMLDivElement>(null)

     useEffect(() => {
          divRef.current?.scrollBy(0, divRef.current.scrollHeight)
     }, [responses])

     return (
          <div className="w-screen flex justify-center text-center flex-col h-screen gap-5">
               <div className="absolute top-5 right-5">
                    <button
                         onClick={handleLogOut}
                         className="border transition border-gray-50 rounded-lg py-1 px-2 bg-white dark:bg-gray-900 text-black dark:text-white dark:hover:bg-gray-600"
                    >
                         Log out
                    </button>
               </div>
               <div className="absolute top-20">
                    <h1 className="text-2xl text-center w-screen pb-6">
                         ✅ Connection established!
                    </h1>
                    <div className="w-screen absolute z-10">
                         <form
                              onSubmit={(e) => handleSubmit(e, creds)}
                              className="w-screen flex flex-col justify-center items-center"
                         >
                              <input
                                   type="text"
                                   name="command"
                                   placeholder="Press enter to send command"
                                   onChange={handleInputChange}
                                   value={command}
                                   onKeyDown={handleKeyDown}
                                   ref={inputRef}
                                   autoComplete="off"
                                   className="border transition w-1/2 border-gray-50 rounded-lg py-1 px-2 bg-white dark:bg-gray-900 text-black dark:text-white dark:focus:bg-gray-700 outline-none"
                              />
                              {suggestions.length > 0 && (
                                   <ul className="text-left w-1/2 px-2 mt-1 border border-gray-500 rounded-lg relative z-10 dark:bg-gray-900">
                                        {suggestions.map((option) => (
                                             <li
                                                  key={option}
                                                  onClick={
                                                       handleSuggestionClick
                                                  }
                                             >
                                                  {option}
                                             </li>
                                        ))}
                                   </ul>
                              )}
                         </form>
                    </div>
               </div>
               <div className="flex flex-col w-full justify-center items-center gap-5">
                    <div
                         className="relative z-0 border w-3/4 h-52 border-gray-50 rounded-lg py-1 px-2 bg-white dark:bg-gray-900 text-black dark:text-white outline-none text-sm overflow-y-auto overflow-x-hidden text-left flex flex-col"
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
          </div>
     )
}
