import Dashboard from "./dashboard";
import RightMenu from "./right-menu";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap justify-center md:flex-nowrap h-screen">
      <Dashboard />
      <main className="md:max-w-[600px] w-full md:w-3/4 xl:w-3/5 border-r border-borderGray overflow-y-scroll h-screen no-scrollbar">
        {children}
      </main>
      <div className="hidden lg:block w-64 md:w-1/4 xl:w-3/12 p-4">
        <RightMenu />
      </div>
    </div>
  );
}
