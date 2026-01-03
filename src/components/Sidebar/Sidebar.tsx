import SidebarItem from "./SidebarItem"
import type { PageIndex } from "../../types/navigation"

type SidebarProps = {
  current: PageIndex
  setCurrent: (value: PageIndex) => void
}

export default function Sidebar({
  current,
  setCurrent,
}: SidebarProps) {
  return (
    <aside className="
      w-64 p-4
      h-screen                     /* Thêm lớp này để Sidebar tràn chiều cao màn hình */
      bg-gray-100 dark:bg-gray-900
      border-r dark:border-gray-700
    ">
      <h2 className="font-bold mb-4 text-lg">
        📚 Thuật toán
      </h2>

      <div className="space-y-2">
        <SidebarItem
          label="0. Giới thiệu"
          active={current === 0}
          onClick={() => setCurrent(0)}
        />

        <SidebarItem
          label="1. Caesar"
          active={current === 1}
          onClick={() => setCurrent(1)}
        />
      </div>
    </aside>
  )
}