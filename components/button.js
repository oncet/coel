export default function Button({ children, ...rest }) {
  return (
    <button
      className="bg-indigo-600 rounded px-2 py-1 inline-block w-full disabled:opacity-50 text-white"
      type="submit"
      {...rest}
    >
      {children}
    </button>
  );
}
