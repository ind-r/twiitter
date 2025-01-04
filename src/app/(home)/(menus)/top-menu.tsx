import Profile from "./profile";

export default function TopMenu() {
  return (
    <div className="dark:bg-black w-full sm:hidden block">
      <div className="flex justify-between items-center border-y dark:border-zinc-800 p-4">
        <Profile />

        <div className="font-bold font-mono dark:text-white">Twiitter</div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14.828 14.828a4 4 0 01-5.656 0M9 9h.01M15 9h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
          />
        </svg>
      </div>
    </div>
  );
}
