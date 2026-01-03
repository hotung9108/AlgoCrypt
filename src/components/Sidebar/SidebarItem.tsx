type SidebarItemProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

export default function SidebarItem({ label, active, onClick }: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left px-2 py-1 rounded
        ${active ? "bg-blue-500 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"}
        hover:bg-blue-100 dark:hover:bg-gray-700
      `}
    >
      {label}
    </button>
  );
}