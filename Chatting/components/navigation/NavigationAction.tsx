"use client";
import { Plus } from "lucide-react";
import React from "react";
import ToolTipAction from "../ToolTipAction";
import useModal from "@/hooks/useModal";

const NavigationAction = () => {
  const { onOpen } = useModal();
  return (
    <div>
      <ToolTipAction side="right" align="center" label="Add a server">
        <button
          className="group flex items-center"
          onClick={() => onOpen("createServer")}
        >
          <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-gradient-to-br from-[#ff7000] to-[#e2995f]">
            <Plus className="group-hover:text-white transition text-[#ff7000]" />
          </div>
        </button>
      </ToolTipAction>
    </div>
  );
};

export default NavigationAction;
