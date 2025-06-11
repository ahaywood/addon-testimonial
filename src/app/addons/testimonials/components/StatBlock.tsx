export const StatBlock = ({
  label,
  number,
  percentage,
  description,
  direction = "up",
}: {
  label: string;
  number: string;
  percentage: string;
  description: string;
  direction?: "up" | "down";
}) => {
  return (
    <div className="border-1 rounded-sm w-full p-5">
      <h2 className="mb-2 font-bold uppercase tracking-wider text-sm font-mono">
        {label}
      </h2>
      <div className="text-7xl font-black font-sans mb-2">{number}</div>
      <div className="flex items-center gap-1.5">
        <span
          className={`text-sm ${
            direction === "up" ? "text-green-600" : "text-red-600"
          }`}
        >
          {percentage}
        </span>
        <span className="text-sm text-gray-500">{description}</span>
      </div>
    </div>
  );
};
