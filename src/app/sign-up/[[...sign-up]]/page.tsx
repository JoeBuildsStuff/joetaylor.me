import { NavBar } from "@/components/pages/layout/nav-bar";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center items-center mt-20">
      <SignUp />
    </div>
  );
}
