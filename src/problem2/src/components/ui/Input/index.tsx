import React from "react";
export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	error: boolean;
	helperText?: string;
	className?: string;
}
export default function Input({
	error,
	helperText,
	className,
	...restProps
}: InputProps) {
	return (
		<>
			<input
				className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
					error &&
					"bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 focus:outline-red-700"
				} ${className}`}
				{...restProps}
			/>
			{helperText && (
				<p className="mt-2 text-sm text-red-600 dark:text-red-500">
					{helperText}
				</p>
			)}
		</>
	);
}
