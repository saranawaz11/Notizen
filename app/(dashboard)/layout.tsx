import React from "react";
import Navbar from "./_components/Navbar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="dark:bg-[#1F1F1F] min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 flex flex-col">
                {children}
            </main>
        </div>
    );
}