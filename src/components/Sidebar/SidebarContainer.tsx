import { useState } from "react";
import SidebarItem from "./SidebarItem";
import type { PageIndex } from "../../types/navigation";

type SidebarContainerProps = {
  label: string;
  items: { label: string; pageIndex: PageIndex }[];
  current: PageIndex;
  setCurrent: (value: PageIndex) => void;
};

export default function SidebarContainer({
  label,
  items,
  current,
  setCurrent,
}: SidebarContainerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      {/* Sidebar Container */}
      <button
        onClick={toggleOpen}
        className={`
          w-full text-left font-bold px-2 py-1
          bg-gray-200 dark:bg-gray-800
          text-gray-800 dark:text-gray-200
          rounded
        `}
      >
        {label}
      </button>

      {/* Sidebar Items */}
      {isOpen && (
        <div className="mt-2 space-y-2 pl-4">
          {items.map((item, index) => (
            <SidebarItem
              key={index}
              label={item.label}
              active={current === item.pageIndex}
              onClick={() => setCurrent(item.pageIndex)}
            />
          ))}
        </div>
      )}
    </div>
  );
}