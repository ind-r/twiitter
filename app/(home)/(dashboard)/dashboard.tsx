import DashboardProfile from "./dashboard-profile";
import Menu from "./menu";

export default function Dashboard() {
  return (
    <nav className="flex justify-center bg-white dark:bg-zinc-950">
      <div className="flex h-screen flex-col justify-between py-10 min-w-[200px]">
        <div className="px-4 py-6">
          <h1 className="dark:text-white font-mono text-center text-3xl">
            Twitter
          </h1>
          <Menu />
        </div>

        <DashboardProfile />
      </div>
    </nav>
  );
}
