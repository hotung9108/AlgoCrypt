import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Intro from "./pages/Intro/Intro";
import Concept from "./pages/Caesar/Concept";
import Operating from "./pages/Caesar/Operating";
import Structure from "./pages/Caesar/Structure";
import Example from "./pages/Caesar/Example";
import Application from "./pages/Caesar/Application";
import type { PageIndex } from "./types/navigation";

export default function App() {
  const [current, setCurrent] = useState<PageIndex>("INTRO");

  return (
    <div
      className="
        min-h-screen
        bg-white dark:bg-gray-800
        text-black dark:text-white
      "
    >
      <Navbar />

      <div className="flex">
        <Sidebar current={current} setCurrent={setCurrent} />

        <main className="flex-1 p-6">
          {current === "INTRO" && <Intro />}
          {current === "CAESAR_CONCEPT" && <Concept />}
          {current === "CAESAR_WORKING" && <Operating/>}
          {current === "CAESAR_STRUCTURE" && <Structure />}
          {current === "CAESAR_EXAMPLE" && <Example />}
          {current === "CAESAR_APPLICATION" && <Application />}
        </main>
      </div>
    </div>
  );
}