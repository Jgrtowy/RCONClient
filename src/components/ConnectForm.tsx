import React, { useEffect, useState } from "react"

export interface FormProps {
     ip: string
     port: number
     password: string
     rememberMe: boolean
}

interface ConnectFormProps {
     formData: FormProps
     onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
     onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
     handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const ConnectForm: React.FC<ConnectFormProps> = ({
     formData,
     onSubmit,
     onInputChange,
     handleCheckboxChange,
}) => {
     return (
          <form onSubmit={onSubmit} className="flex flex-col gap-3">
               <div className="flex items-center justify-center gap-7 w-96">
                    <label htmlFor="ip" className="text-xl w-16 text-left">
                         IP
                    </label>
                    <input
                         type="text"
                         id="ip"
                         name="ip"
                         className="border transition border-gray-50 rounded-lg py-1 px-2 bg-white dark:bg-gray-900 text-black dark:text-white dark:focus:bg-gray-700 outline-none"
                         value={formData.ip}
                         onChange={onInputChange}
                    />
               </div>
               <div className="flex items-center justify-center gap-7 w-96 ">
                    <label htmlFor="port" className=" text-xl w-16 text-left">
                         Port
                    </label>
                    <input
                         type="number"
                         id="port"
                         name="port"
                         className="border transition border-gray-50 rounded-lg py-1 px-2 bg-white dark:bg-gray-900 text-black dark:text-white dark:focus:bg-gray-700 outline-none"
                         style={{
                              WebkitAppearance: "none",
                              MozAppearance: "textfield",
                         }}
                         onChange={onInputChange}
                         value={formData.port}
                    />
               </div>
               <div className="flex items-center justify-center gap-2 w-96">
                    <label
                         htmlFor="password"
                         className="text-xl w-max text-left"
                    >
                         Password
                    </label>
                    <input
                         type="password"
                         name="password"
                         id="password"
                         onChange={onInputChange}
                         value={formData.password}
                         className="border transition border-gray-50 rounded-lg py-1 px-2 bg-white dark:bg-gray-900 text-black dark:text-white dark:focus:bg-gray-700 outline-none"
                    />
               </div>
               <div className="flex items-center justify-center gap-12 w-96 ">
                    <label htmlFor="remember" className="text-xl w-16">
                         Remember
                    </label>
                    <input
                         type="checkbox"
                         name="remember"
                         id="remember"
                         onChange={handleCheckboxChange}
                         checked={formData.rememberMe}
                         className="border transition border-gray-50 rounded-lg py-1 px-2 bg-white dark:bg-gray-900 text-black dark:text-white dark:focus:bg-gray-700 outline-none"
                    />
               </div>
               <div className="flex gap-5 items-center justify-center">
                    <input
                         type="submit"
                         value="Connect"
                         className="border transition border-gray-50 rounded-lg py-1 px-2 bg-white dark:bg-gray-900 text-black dark:text-white dark:hover:bg-gray-600"
                    />
               </div>
          </form>
     )
}
export default ConnectForm
