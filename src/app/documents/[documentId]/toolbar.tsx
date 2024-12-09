"use client";
import { cn } from "@/lib/utils";
import { Undo2Icon, type LucideIcon } from "lucide-react";
import { ReactElement, type FC } from "react";

interface ToolbarButtonProps {
  onClick: () => void;
  isActive: boolean;
  icon: LucideIcon;
}

const ToolbarButton: FC<ToolbarButtonProps> = ({ onClick, isActive, icon: Icon }): ReactElement => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
        isActive && "bg-neutral-200"
      )}
    >
      <Icon className="size-4" />
    </button>
  );
};

const Toolbar = ({}): ReactElement => {
  const section: { label: string; icon: LucideIcon; onClick: () => void; isActive: boolean }[][] = [
    [
      {
        label: "Undo",
        icon: Undo2Icon,
        onClick: () => {
          console.log("undo");
        },
        isActive: false,
      },
    ],
  ];

  return (
    <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
      {section[0].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
    </div>
  );
};

export default Toolbar;
