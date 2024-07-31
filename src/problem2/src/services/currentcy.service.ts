import { useState, useEffect } from "react";
import { ListCurrencyNameMock } from "../mock/listCurrencyName";
import { ListCurrenciesRate } from "../mock/listCurrenciesRate";

import { Currency } from "../types/currency.type";

export const useGetCurrencies = () => {
	const [listCurrencyName, setListCurrencyName] = useState<
		Pick<Currency, "currency" | "value">[]
	>([]);

	// fake call api
	useEffect(() => {
		const fetchData = async () => {
			try {
				setListCurrencyName(await Promise.resolve(ListCurrencyNameMock));
			} catch (error) {
				console.error(error);
			}
			setListCurrencyName(ListCurrencyNameMock);
		};

		fetchData();
	}, []);

	return { data: listCurrencyName };
};

export const getExchangeRate = async (
	baseCurrency: string,
	targetCurrency: string
) => {
	try {
		// fake delay
		await new Promise((resolve) => setTimeout(resolve, 1000));

		const baseCurrencyRate = ListCurrenciesRate.find(
			(currency) => currency.currency === baseCurrency
		)?.price;
		const targetCurrencyRate = ListCurrenciesRate.find(
			(currency) => currency.currency === targetCurrency
		)?.price;

		if (!baseCurrencyRate || !targetCurrencyRate) {
			alert("Currency not found");
			return 0;
		}
		return baseCurrencyRate / targetCurrencyRate;
	} catch (err) {
		// handle err
		alert("There was an error fetching exchange rate data");
		return 0;
	}
};
