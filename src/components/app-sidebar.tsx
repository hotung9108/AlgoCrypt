import * as React from "react"
import { ChevronRight } from "lucide-react"

import { SearchForm } from "@/components/search-form"
// import { VersionSwitcher } from "./version-switcher"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
const data = {
    navMain: [
        {
            title: "Intro",
            items: [
                {
                    key: "INTRO",
                    title: "Giới thiệu",
                },
            ],
        },
        {
            title: "Caesar Cipher",
            items: [
                { key: "CAESAR_CONCEPT", title: "Khái niệm" },
                { key: "CAESAR_WORKING", title: "Cách hoạt động" },
                { key: "CAESAR_STRUCTURE", title: "Cấu trúc" },
                { key: "CAESAR_EXAMPLE", title: "Ví dụ" },
                { key: "CAESAR_APPLICATION", title: "Ứng dụng thực thế" },
            ],
        },
        {
            title: "PlayFair Cipher",
            items: [
                { key: "CAESAR_CONCEPT", title: "Concept" },
                { key: "CAESAR_WORKING", title: "Working" },
                { key: "CAESAR_STRUCTURE", title: "Structure" },
                { key: "PLAYFAIR_EXAMPLE", title: "Ví dụ" },
                { key: "CAESAR_APPLICATION", title: "Application" },
            ],
        },
        {
            title: "Vigenere Cipher",
            items: [
                { key: "CAESAR_CONCEPT", title: "Concept" },
                { key: "CAESAR_WORKING", title: "Working" },
                { key: "CAESAR_STRUCTURE", title: "Structure" },
                { key: "VIGENERE_EXAMPLE", title: "Ví dụ" },
                { key: "CAESAR_APPLICATION", title: "Application" },
            ],
        },
    ],
};
export function AppSidebar({
    setCurrentPage,
    currentPage,
    ...props
}: React.ComponentProps<typeof Sidebar> & {
    setCurrentPage: (page: string) => void;
    currentPage: string;
}) {
    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <div className="flex items-center justify-center py-4 text-xl font-bold">
                    AlgoCrypt
                </div>
                <SearchForm />
            </SidebarHeader>
            <SidebarContent className="gap-0">
                {data.navMain.map((item) => (
                    <Collapsible
                        key={item.title}
                        title={item.title}
                        defaultOpen
                        className="group/collapsible"
                    >
                        <SidebarGroup>
                            <SidebarGroupLabel
                                asChild
                                className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
                            >
                                <CollapsibleTrigger>
                                    {item.title}{" "}
                                    <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                </CollapsibleTrigger>
                            </SidebarGroupLabel>
                            <CollapsibleContent>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        {item.items.map((subItem) => (
                                            <SidebarMenuItem key={subItem.key}>
                                                <SidebarMenuButton
                                                    asChild
                                                    onClick={() => setCurrentPage(subItem.key)}
                                                >
                                                    <button
                                                        className={`pl-4 text-left w-full${currentPage === subItem.key
                                                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                                                            : ""
                                                            }`}
                                                    >
                                                        {subItem.title}
                                                    </button>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ))}
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </CollapsibleContent>
                        </SidebarGroup>
                    </Collapsible>
                ))}
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}