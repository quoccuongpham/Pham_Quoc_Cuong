export default function SwapIcon({ className }: { className?: string }) {
	return (
		<svg
			className={`w-6 h-6 text-gray-800 dark:text-white ${className}`}
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			fill="none"
			viewBox="0 0 24 24"
		>
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="m16 10 3-3m0 0-3-3m3 3H5v3m3 4-3 3m0 0 3 3m-3-3h14v-3"
			/>
		</svg>
	);
}
