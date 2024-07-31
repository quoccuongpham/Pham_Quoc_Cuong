// @ts-nocheck
interface WalletBalance {
	currency: string;
	amount: number;
}
interface FormattedWalletBalance {
	currency: string;
	amount: number;
	formatted: string;
}

interface Props extends BoxProps {}
const WalletPage: React.FC<Props> = (props: Props) => {
	const { children, ...rest } = props;
	const balances = useWalletBalances();
	const prices = usePrices();

	// blockchain using any type
	const getPriority = (blockchain: any): number => {
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
				// balance dont have blockchain property
				const balancePriority = getPriority(balance.blockchain);

				// wrong logic
				if (lhsPriority > -99) {
					if (balance.amount <= 0) {
						return true;
					}
				}
				return false;
			})
			.sort((lhs: WalletBalance, rhs: WalletBalance) => {
				// not clearly
				const leftPriority = getPriority(lhs.blockchain);
				const rightPriority = getPriority(rhs.blockchain);
				if (leftPriority > rightPriority) {
					return -1;
				} else if (rightPriority > leftPriority) {
					return 1;
				}
			});
		// unnessary dependency
	}, [balances, prices]);

	// unnecessary computation
	const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
		return {
			...balance,
			formatted: balance.amount.toFixed(),
		};
	});

	const rows = sortedBalances.map(
		(balance: FormattedWalletBalance, index: number) => {
			// hard code, dont check safe type
			const usdValue = prices[balance.currency] * balance.amount;
			return (
				<WalletRow
					className={classes.row}
					key={index}
					amount={balance.amount}
					usdValue={usdValue}
					formattedAmount={balance.formatted}
				/>
			);
		}
	);

	return <div {...rest}>{rows}</div>;
};
