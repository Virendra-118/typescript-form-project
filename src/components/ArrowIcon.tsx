type ArrowIconProps = {
  direction: "left" | "right";
};

function ArrowIcon({ direction }: ArrowIconProps) {
  const path =
    direction === "left"
      ? "M15.5 10h-11M10 15.5 4.5 10 10 4.5"
      : "M4.5 10h11M10 4.5l5.5 5.5-5.5 5.5";

  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}

export default ArrowIcon;
