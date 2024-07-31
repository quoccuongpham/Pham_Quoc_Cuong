import LoadingIcon from "../../../icons/LoadingIcon";

export interface ButtonProp extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
  className?: string;
}
export default function Button({ children, loading = false, className, ...resrProps }: ButtonProp) {
  return (
    <button
      className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none flex justify-center items-center w-full h-12 ${className} ${
        loading && "opacity-50 cursor-not-allowed"
      }`}
      {...resrProps}
    >
      {loading ? <LoadingIcon className="w-6 h-6" /> : children}
    </button>
  );
}
