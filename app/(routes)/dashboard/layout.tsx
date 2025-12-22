import React from "react";
import AppHeader from "./_components/AppHeader";
import Footer from "@/components/ui/footer";

function Dashboard({ children }: { children: React.ReactNode }){
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className="flex-1 px-10 md:px-20 lg:px-40 py-10">{children}</main>
      <Footer />
    </div>
  );
}
export default Dashboard