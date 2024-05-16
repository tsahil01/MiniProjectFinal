"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const JoinRoom = () => {
  const [isOpen, setIsOpen] = useState(true); // State to control the dialog's visibility
  const [roomId, setRoomId] = useState("");
  const [copied, setIsCopied] = useState("Copy Link");

  const handleCopyLink = () => {
    // Logic to copy the link with the room ID
    const link = `${window.location.origin}/livecode/${roomId}`;
    navigator.clipboard.writeText(link);
    setIsCopied("Copied");
    setTimeout(() => {
      setIsOpen(false); // Close the dialog after a short delay
    }, 1000); // Adjust the delay time as needed
    setIsOpen(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(newOpen) => setIsOpen(newOpen)}>
      <DialogContent className="bg-white dark:bg-[#1e1f22] text-black dark:text-white p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-left font-bold">
            Create Room
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-8 px-6">
          <div className="flex flex-col space-y-4">
            <label htmlFor="room-id" className="uppercase text-xs font-bold text-zinc-800 dark:text-zinc-400">
              Room ID
            </label>
            <Input
              id="room-id"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="bg-zinc-300/50 dark:bg-zinc-900 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0"
              placeholder="Enter Room ID"
            />
          </div>
        </div>
        <DialogFooter className="bg-gray-100 dark:bg-[#0f1117] px-6 py-4">
          <Button onClick={handleCopyLink} variant={"secondary"}>
            {copied}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default JoinRoom;
