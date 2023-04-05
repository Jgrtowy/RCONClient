import React from "react"

export default function Footer() {
     return (
          <div className="px-8 flex justify-center items-center py-1 border dark:border-gray-50 border-black rounded-lg text-base">
               <h1>
                    <a
                         href="https://github.com/Jgrtowy/RCONClient/blob/master/LICENSE"
                         className="italic text-black hover:text-gray-600 dark:hover:text-white dark:text-gray-400 transition"
                    >
                         License
                    </a>{" "}
                    | Made with ❤️ by{" "}
                    <a
                         href="https://jgrtowy.xyz"
                         className="font-bold text-black hover:text-gray-600 dark:hover:text-white dark:text-gray-400 transition"
                    >
                         Jgrtowy
                    </a>{" "}
                    |{" "}
                    <a
                         href="https://github.com/Jgrtowy/RCONClient"
                         className="italic text-black hover:text-gray-600 dark:hover:text-white dark:text-gray-400 transition"
                    >
                         Github
                    </a>
               </h1>
          </div>
     )
}
