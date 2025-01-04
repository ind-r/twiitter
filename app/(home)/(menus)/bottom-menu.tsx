"use client";
export default function BottomMenu() {
  const handleClick = () => {
    console.log("clicked");
  };
  return (
    <div className="sm:hidden bottom-0 absolute bg-white dark:bg-zinc-950 w-full">
      <div className="flex justify-around items-center border-y dark:border-zinc-800">
        <button className="py-4 dark:invert" onClick={() => handleClick()}>
          <svg
            className="w-5 h-5"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M1 6V15H6V11C6 9.89543 6.89543 9 8 9C9.10457 9 10 9.89543 10 11V15H15V6L8 0L1 6Z"
                fill="#000000"
              ></path>{" "}
            </g>
          </svg>
        </button>
        <button className="py-4 dark:invert" onClick={() => handleClick()}>
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
}
