import React, { useEffect, useState } from "react"
import "./App.css"
import APIStatus from "./components/APIStatus"
import Console from "./components/Console"
import HandleForm from "./components/HandleForm"
import { setDarkMode } from "./DarkMode"
import RCONConnect from "./RCONConnect"
import viteLogo from "/vite.svg"

setDarkMode()

function App() {
     const [formData, setFormData] = useState({
          ip: "",
          port: 25575,
          password: "",
          remember: false,
     })

     const [index, setIndex] = useState(0)

     useEffect(() => {
          const successfulConnection = localStorage.getItem(
               "successfulConnection"
          )
          if (successfulConnection) {
               setFormData(JSON.parse(successfulConnection))
               setIndex(3)
          }
     }, [])

     const handleFormSubmit = async (data: any) => {
          setIndex(1)
          setFormData(data)
          if (!(await RCONConnect(data, ""))) {
               setIndex(2)
          } else {
               setIndex(3)
               localStorage.setItem(
                    "successfulConnection",
                    JSON.stringify(data)
               )
          }
     }
     const reconnect = () => {
          setIndex(0)
     }

     const [elements] = useState([
          <Form handleFormSubmit={handleFormSubmit} />,
          <Connecting />,
          <Error reconnect={reconnect} />,
          <Console handleLogOut={() => handleLogOut()} />,
     ])

     const handleLogOut = () => {
          localStorage.removeItem("successfulConnection")
          setIndex(0)
     }

     return (
          <div className="App bg-white dark:bg-gray-900 flex flex-col gap-3 text-black dark:text-white justify-center items-center h-screen w-screen text-xl">
               {elements[index]}
          </div>
     )
}

function Connecting() {
     return <div>👀 Trying to connect...</div>
}

function Error({ reconnect }: any) {
     return (
          <div>
               <h1>❌ Error!</h1>
               <button
                    onClick={reconnect}
                    className="border border-gray-50 rounded-lg py-1 px-2 bg-white dark:bg-gray-900 text-black dark:text-white dark:hover:bg-gray-600"
               >
                    Reconnect
               </button>
          </div>
     )
}

function Form({ handleFormSubmit }: any) {
     return (
          <>
               <HandleForm onFormSubmit={handleFormSubmit} />
               <br />
               <APIStatus />
          </>
     )
}

export default App
