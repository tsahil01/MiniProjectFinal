import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="h-full w-full  z-1 flex justify-center items-center">
      <SignUp />
    </div>
  );
}
