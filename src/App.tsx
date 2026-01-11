import { useState } from "react"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { ModeToggle } from "./components/mode-toggle";
import Intro from "./pages/Intro/Intro";
import { ThemeProvider} from "./components/theme-provider";
import Application from "./pages/Caesar/caesar-application";
import Concept from "./pages/Caesar/caesar-concept";
import Example from "./pages/Caesar/caesar-example";
import Operating from "./pages/Caesar/caesar-operating";
import Structure from "./pages/Caesar/caesar-structure";
import WIP from "./pages/Intro/WIP";
import PlayfairExample from "./pages/PlayFair/playfair-example";
import VigenereExample from "./pages/Vigenere/vigenere-example";
export default function App() {
    const [currentPage, setCurrentPage] = useState("INTRO")
        const renderPage = () => {
        switch (currentPage) {
            case "INTRO":
                return <Intro />
            case "CAESAR_CONCEPT":
                return <Concept />
            case "CAESAR_WORKING":
                return <Operating />
            case "CAESAR_STRUCTURE":
                return <Structure />
            case "CAESAR_EXAMPLE":
                return <Example />
            case "CAESAR_APPLICATION":
                return <Application />
            case "PLAYFAIR_EXAMPLE":
                return <PlayfairExample/>
            case "VIGENERE_EXAMPLE":
                return <VigenereExample/>
            default:
                return <WIP/>
        }
    }
    return (
        <ThemeProvider>
            <SidebarProvider>
                <AppSidebar setCurrentPage={setCurrentPage} currentPage={""} />
                <SidebarInset>
                    <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
                        <SidebarTrigger className="-ml-1" />
                        <div className="flex items-center gap-4 ml-auto">
                            <ModeToggle />
                        </div>
                    </header>
                    <main className="p-4">{renderPage()}</main>
                </SidebarInset>
            </SidebarProvider>
        </ThemeProvider>
    );
}