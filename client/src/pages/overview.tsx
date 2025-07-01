import { useEffect } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import OverviewModule from "@/components/modules/OverviewModule";

export default function Overview() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {

  }, [dispatch]);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-background">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto">
        <TopBar />
        
        <div className="p-6 space-y-6">
            <OverviewModule/>
        </div>
      </main>
    </div>
  );
}
