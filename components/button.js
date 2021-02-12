export default function Button({ children, className, ...rest }) {
  return (
    <button
      className={`bg-indigo-600 rounded px-2 py-1 inline-block w-full disabled:opacity-50 text-white ${className}`}
      type="submit"
      {...rest}
    >
      {children}
    </button>
  );
}
