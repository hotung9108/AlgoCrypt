import { useState } from "react"
import Navbar from "./components/Navbar/Navbar"
import Sidebar from "./components/Sidebar/Sidebar"
import Intro from "./pages/Intro"
import Caesar from "./pages/Caesar"
import type { PageIndex } from "./types/navigation"

export default function App() {
  const [current, setCurrent] = useState<PageIndex>(0)

  return (
    <div className="
      min-h-screen
      bg-white dark:bg-gray-800
      text-black dark:text-white
    ">
      <Navbar />

      <div className="flex">
        <Sidebar current={current} setCurrent={setCurrent} />

        <main className="flex-1 p-6">
          {current === 0 && <Intro />}
          {current === 1 && <Caesar />}
        </main>
      </div>
    </div>
  )
}
