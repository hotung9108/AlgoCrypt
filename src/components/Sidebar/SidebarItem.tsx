type SideBarItemProps = {
    label: string
    active: boolean
    onClick: () => void
}

export default function SidebarItem({
    label,
    active,
    onClick,
}: SideBarItemProps){
    return(
        <button
            onClick={onClick}
            className={
                `w-full text-left px-4 py-2 rounded transition ${active?"bg-blue-500 text-white": "hover:bg-gray-200 dark:hover:bg-gray-700"}`
            }
            >
            {label}
        </button>
    )
}