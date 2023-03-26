import React, { useEffect, useState } from "react"
import "./App.css"
import APIStatus from "./components/APIStatus"
import HandleForm from "./components/HandleForm"
import { setDarkMode } from "./DarkMode"
import RCONConnect from "./RCONConnect"
import viteLogo from "/vite.svg"

setDarkMode()

function App() {
     const [formData, setFormData] = useState({
          ip: "",
          port: 0,
          password: "",
          remember: false,
     })

     const [index, setIndex] = useState(0)

     const handleFormSubmit = async (data: any) => {
          setIndex(1)
          setFormData(data)
          if (await RCONConnect(data)) {
               setIndex(3)
          } else {
               setIndex(2)
          }
     }
     const reconnect = () => {
          setIndex(0)
     }

     const [elements] = useState([
          <Form handleFormSubmit={handleFormSubmit} />,
          <Connecting />,
          <Error reconnect={reconnect} />,
     ])

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
                    className="border bordar-gray-50 rounded-lg py-1 px-2 bg-white dark:bg-gray-900 text-black dark:text-white dark:hover:bg-gray-600"
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
