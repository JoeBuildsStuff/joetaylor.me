import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CircleUser, Eclipse, LogOut, Settings, User } from "lucide-react";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/");
  };

  return user ? (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage
            src={user.user_metadata.avatar_url}
            alt={user.user_metadata.name}
          />
          <AvatarFallback>
            <User className="" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[20rem]">
        <DropdownMenuLabel>
          <div className="flex items-center gap-5">
            <Avatar className="w-10 h-10">
              <AvatarImage
                src={user.user_metadata.avatar_url}
                alt={user.user_metadata.name}
              />
              <AvatarFallback>
                <User className="" />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <div>{user.user_metadata.full_name}</div>
              <div className="text-sm text-muted-foreground">{user.email}</div>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <div className="flex items-center gap-5">
            <Settings className="mx-2" />
            <div className="flex flex-col">
              <div>Account Settings</div>
              <div className="text-sm text-muted-foreground">
                Manage your account
              </div>
            </div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="flex items-center gap-5">
            <CircleUser className="mx-2" />
            <div className="flex flex-col">
              <div>My Profile</div>
              <div className="text-sm text-muted-foreground">
                Exlore your profile
              </div>
            </div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="flex items-center gap-5">
            <Eclipse className="mx-2" />
            <div className="flex flex-col">
              <div>Appearance</div>
              <div className="text-sm text-muted-foreground">
                Light or dark mode
              </div>
            </div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <form action={signOut}>
            <button type="submit" className="flex items-center gap-5">
              <LogOut className="mx-2" />
              <div className="flex flex-col items-start justify-start">
                <div>Sign out</div>
                <div className="text-sm text-muted-foreground">
                  Catch you on the flip side!
                </div>
              </div>
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Button asChild variant="outline" className="">
      <Link href="/signin">Sign in</Link>
    </Button>
  );

  // return user ? (
  //   <div className="flex items-center gap-4">
  //     Hey, {user.email}!
  // <form action={signOut}>
  //   <Button>Logout</Button>
  // </form>
  //   </div>
  // ) : (
  //   <Button variant="ghost" className="hidden md:block text-md">
  //     <Link href="/signin">signin</Link>
  //   </Button>
  // );
}
