export default function Button({ variant = "primary", children, onClick, className = "" }) {
  const base = "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-95";

  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-200 hover:shadow-md hover:shadow-indigo-200",
    outline: "border border-indigo-300 text-indigo-600 hover:bg-indigo-50",
  };

  return (
    <button onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}