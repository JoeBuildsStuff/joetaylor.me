import TaskPage from "@/components/tasks/page";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/signin");
  }

  return (
    <div>
      <TaskPage />
    </div>
  );
}
