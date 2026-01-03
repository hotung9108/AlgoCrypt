import SidebarContainer from "./SidebarContainer";
import type { PageIndex } from "../../types/navigation";

type SidebarProps = {
  current: PageIndex;
  setCurrent: (value: PageIndex) => void;
};

export default function Sidebar({ current, setCurrent }: SidebarProps) {
  const containers = [
    {
      label: "Giới thiệu",
      items: [{ label: "Giới thiệu", pageIndex: "INTRO" as PageIndex }],
    },
    {
      label: "Thuật Toán Caesar",
      items: [
        { label: "Khái niệm", pageIndex: "CAESAR_CONCEPT" as PageIndex },
        { label: "Nguyên lý hoạt động", pageIndex: "CAESAR_WORKING" as PageIndex },
        { label: "Cấu trúc thuật toán", pageIndex: "CAESAR_STRUCTURE" as PageIndex },
        { label: "Ứng dụng thực tế", pageIndex: "CAESAR_APPLICATION" as PageIndex },
        { label: "Ví dụ minh họa", pageIndex: "CAESAR_EXAMPLE" as PageIndex },
      ],
    },
  ];

  return (
    <aside
      className="
        w-64 p-4
        h-screen
        bg-gray-100 dark:bg-gray-900
        border-r dark:border-gray-700
      "
    >
      <h2 className="font-bold mb-4 text-lg">📚 Thuật toán</h2>

      <div className="space-y-4">
        {containers.map((container, index) => (
          <SidebarContainer
            key={index}
            label={container.label}
            items={container.items}
            current={current}
            setCurrent={setCurrent}
          />
        ))}
      </div>
    </aside>
  );
}