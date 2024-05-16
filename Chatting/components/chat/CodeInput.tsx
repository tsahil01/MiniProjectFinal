"use client";
import React, { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import axios from "axios";
import qs from "query-string";
import useModal from "@/hooks/useModal";
import { useRouter } from "next/navigation";
import { Textarea } from "../ui/textarea";
import Rooms from "../Coding";

interface CodeInputProps {
  apiUrl: string;
  query: Record<string, any>;
  name: string;
  type: "conversation" | "channel";
}

const formSchema = z.object({
  content: z.string().min(1),
  fileUrl: z.string().optional(),
});

const CodeInput: React.FC<CodeInputProps> = ({ apiUrl, query, name, type }) => {
  const roomId = query.channelId;
  console.log(roomId)
  const { onOpen } = useModal();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      content: "",
      fileUrl: "",
    },
    resolver: zodResolver(formSchema),
  });

  const isLoading = form.formState.isSubmitting;

  const [showCodeRoom, setShowCodeRoom] = useState(false);

  //   const onSubmit = async (data: z.infer<typeof formSchema>) => {
  //     try {
  //       const url = qs.stringifyUrl({
  //         url: apiUrl,
  //         query,
  //       });
  //       await axios.post(url, data);
  //       form.reset();
  //       router.refresh();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
        setShowCodeRoom(true);
    }, 5000);

    // Clear the timeout if the component unmounts before 5 seconds
    return () => clearTimeout(timeoutId);
}, []); // Empty dependency array means this effect runs only once on component mount

  return (
    <div className="relative p-2 w-full ">
      <div className=" w-full ">
      {showCodeRoom && (
                    <div className='w-full'>
                    <Rooms roomId={roomId} h={"55vh"} w={"100"} />
                    </div>
                )}
      </div>
    </div>
  );
};

export default CodeInput;
