import Dashboard from "./(dashboard)/dashboard";
import BottomMenu from "./(menus)/bottom-menu";
import TopMenu from "./(menus)/top-menu";
import Guide from "./guide";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex sm:flex-row flex-col justify-between w-screen">
      <div className="sm:block hidden basis-1/3">
        <Dashboard />
      </div>
      <main
        className="md:max-w-[600px] w-full border-x dark:bg-zinc-950 dark:border-zinc-800 
    overflow-y-scroll h-screen no-scrollbar"
      >
        <TopMenu />
        {children}
        <BottomMenu />
      </main>
      <div className="hidden md:block p-4 basis-1/3 dark:bg-zinc-950">
        <Guide />
      </div>
    </div>
  );
}
