import { useEffect, useState } from "react"
import ConnectForm from "./ConnectForm"

type HandleFormProps = {
     onFormSubmit: (data: any) => void
}

const HandleForm = ({ onFormSubmit }: HandleFormProps) => {
     const [formData, setFormData] = useState({
          ip: "",
          port: 25575,
          password: "",
          rememberMe: false,
     })
     const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          const { name, value } = event.target
          setFormData({
               ...formData,
               [name]: value,
          })
     }
     useEffect(() => {
          const ip = localStorage.getItem("ip")
          const port = localStorage.getItem("port")
          const password = localStorage.getItem("password")
          const rememberMe = localStorage.getItem("rememberMe")
          if (ip && port && password && rememberMe) {
               setFormData({
                    ip: ip,
                    port: parseInt(port),
                    password: password,
                    rememberMe: rememberMe == "true" ? true : false,
               })
          }
     }, [])
     const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault()
          if (
               !/^(?:\d{1,3}\.){3}\d{1,3}$/.test(formData.ip) &&
               !/^(?:[a-fA-F0-9]{1,4}:){7}[a-fA-F0-9]{1,4}$/.test(
                    formData.ip
               ) &&
               !/^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/.test(
                    formData.ip
               )
          )
               return
          if (formData.port < 1 || formData.port > 65535) return
          if (formData.password.length < 1) return
          if (formData.rememberMe === true) {
               localStorage.setItem("ip", formData.ip)
               localStorage.setItem("port", formData.port.toString())
               localStorage.setItem("password", formData.password)
               localStorage.setItem(
                    "rememberMe",
                    formData.rememberMe.toString()
               )
          }
          if (formData.rememberMe === false) {
               localStorage.removeItem("ip")
               localStorage.removeItem("port")
               localStorage.removeItem("password")
               localStorage.removeItem("rememberMe")
          }
          onFormSubmit(formData)
     }

     const handleCheckboxChange = (
          event: React.ChangeEvent<HTMLInputElement>
     ) => {
          const { checked } = event.target
          setFormData({
               ...formData,
               rememberMe: checked,
          })
     }

     return (
          <>
               <ConnectForm
                    formData={formData}
                    onSubmit={handleSubmit}
                    onInputChange={handleInputChange}
                    handleCheckboxChange={handleCheckboxChange}
               />
               <div>
                    <h1></h1>
               </div>
          </>
     )
}
export default HandleForm
