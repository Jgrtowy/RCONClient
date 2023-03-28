import React from "react"

export default function Footer() {
     return (
          <div className="px-10 py-1 border border-gray-50 rounded-lg">
               <h1>
                    <a
                         href="https://github.com/Jgrtowy/RCONClient/blob/master/LICENSE"
                         className="italic hover:text-white text-gray-400 transition"
                    >
                         License
                    </a>{" "}
                    | Made with ❤️ by{" "}
                    <a
                         href="https://jgrtowy.xyz"
                         className="font-bold hover:text-white text-gray-400 transition"
                    >
                         Jgrtowy
                    </a>{" "}
                    |{" "}
                    <a
                         href="https://github.com/Jgrtowy/RCONClient"
                         className="italic hover:text-white text-gray-400 transition"
                    >
                         Github
                    </a>
               </h1>
          </div>
     )
}
