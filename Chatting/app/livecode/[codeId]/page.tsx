"use client";

import { useState, useEffect } from 'react';
import CodeRoom from "@/components/CodeRoom";
import Rooms from "@/components/Coding";
import MediaRoom from "@/components/MediaRoom";

export default function Code({ params }: { params: { codeId: string } }) {
    const [showCodeRoom, setShowCodeRoom] = useState(false);
    const roomId = params.codeId;

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShowCodeRoom(true);
        }, 5000);

        // Clear the timeout if the component unmounts before 5 seconds
        return () => clearTimeout(timeoutId);
    }, []); // Empty dependency array means this effect runs only once on component mount

    return (
        <>
            <div className="flex flex-row h-[98vh] w-full gap-2 justify-between m-auto rounded text-center">
                {showCodeRoom && (
                    <div className='w-full'>
                    <Rooms roomId={roomId} h={"96vh"} w={"96"} />
                    </div>
                )}
                <div className="w-full overflow-hidden">
                    <CodeRoom chatId={roomId} video={true} audio={true} />
                </div>
            </div>
        </>
    );
}
