export default function Button({ color, children, className, ...rest }) {
  const colors = {
    default: "bg-green-600",
    primary: "bg-indigo-600",
    secondary: "bg-red-600",
  };

  return (
    <button
      className={`rounded px-2 py-1 inline-block w-full disabled:opacity-50 text-white ${
        !!colors[color] ? colors[color] : colors.default
      } ${className}`}
      type="button"
      {...rest}
    >
      {children}
    </button>
  );
}
