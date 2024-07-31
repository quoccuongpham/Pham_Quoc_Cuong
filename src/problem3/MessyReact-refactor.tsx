// @ts-nocheck
interface WalletBalance {
	currency: string;
	amount: number;
	blockchain: string; // Added for clarity
}
interface FormattedWalletBalance extends WalletBalance {
	formatted: string;
}

interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props: Props) => {
	const { children, ...rest } = props;
	const balances = useWalletBalances();
	const prices = usePrices();

	// specific type
	const getPriority = (
		blockchain: "Osmosis" | "Ethereum" | "Arbitrum" | "Zilliqa" | "Neo"
	): number => {
		switch (blockchain) {
			case "Osmosis":
				return 100;
			case "Ethereum":
				return 50;
			case "Arbitrum":
				return 30;
			case "Zilliqa":
				return 20;
			case "Neo":
				return 20;
			default:
				return -99;
		}
	};

	const sortedBalances = useMemo(() => {
		return balances
			.filter((balance: WalletBalance) => {
				const balancePriority = getPriority(balance.blockchain);
				return balancePriority > -99 && balance.amount > 0;
			})
			.sort(
				(lhs: WalletBalance, rhs: WalletBalance) =>
					getPriority(rhs.blockchain) - getPriority(lhs.blockchain)
			);
		// remove unnecessary dependency
	}, [balances]);

	const rows = sortedBalances.map(
		(balance: FormattedWalletBalance, index: number) => {
			const usdValue = prices[balance.currency]
				? prices[balance.currency] * balance.amount
				: 0;
			return (
				<WalletRow
					className={classes.row}
					key={index}
					amount={balance.amount}
					usdValue={usdValue}
					formattedAmount={balance.amount.toFixed()}
				/>
			);
		}
	);

	return <div {...rest}>{rows}</div>;
};
