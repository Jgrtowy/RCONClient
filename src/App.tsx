import { useEffect, useState } from "react"
import "./App.css"
import { setDarkMode } from "./DarkMode"
import RCONConnect from "./RCONConnect"
import APIStatus from "./components/APIStatus"
import Console from "./components/Console"
import Footer from "./components/Footer"
import HandleForm from "./components/HandleForm"

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

          const connection = await RCONConnect(data, "")
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
          <Connecting reconnect={reconnect} />,
          <Error reconnect={reconnect} />,
          <Console handleLogOut={() => handleLogOut()} />,
     ])

     const handleLogOut = () => {
          localStorage.removeItem("successfulConnection")
          setIndex(0)
     }

     return (
          <div className="App bg-gray-300 dark:bg-gray-900 flex flex-col gap-3 text-black dark:text-white justify-center items-center h-screen w-screen text-xl">
               {elements[index]}
               <div className="absolute bottom-5">
                    <Footer />
               </div>
          </div>
     )
}

function Connecting({ reconnect }: any) {
     return (
          <>
               <div>👀 Trying to connect...</div>
               <button
                    onClick={reconnect}
                    className="border transition border-black dark:border-gray-50 rounded-lg py-1 px-2 bg-white dark:bg-gray-900 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
               >
                    Disconnect
               </button>
          </>
     )
}

function Error({ reconnect }: any) {
     return (
          <div>
               <h1 className="text-center">❌ Error!</h1>
               <button
                    onClick={reconnect}
                    className="border transition border-black dark:border-gray-50 rounded-lg py-1 px-2 bg-white dark:bg-gray-900 text-black hover:bg-gray-200 dark:text-white dark:hover:bg-gray-600"
               >
                    Reconnect
               </button>
          </div>
     )
}

function Form({ handleFormSubmit }: any) {
     return (
          <>
               <h1 className="absolute top-12 text-4xl font-bold">
                    🌍 RCON Client
               </h1>
               <HandleForm onFormSubmit={handleFormSubmit} />
               <br />
               <APIStatus />
          </>
     )
}

export default App
