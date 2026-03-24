// app/notes/layout.tsx
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import NavigationWrapper from "@/app/notes/_components/NavigationWrapper";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <div className="h-full flex dark:bg-[#1F1F1F]">
      <NavigationWrapper>
        {children}
      </NavigationWrapper>
    </div>
  );
}