import * as Yup from "yup";
import { useFormik } from "formik";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import SwapIcon from "./icons/SwapIcon";
import Dropdown from "./components/ui/Dropdown";
import { useEffect, useRef, useState } from "react";
import {
	useGetCurrencies,
	getExchangeRate,
} from "./services/currentcy.service";

function App() {
	const { data: listCurrencies } = useGetCurrencies();

	const [baseCurrency, setBaseCurrency] = useState(
		listCurrencies[0]?.value || ""
	);
	const [targetCurrency, setTargetCurrency] = useState(
		listCurrencies[1]?.value || ""
	);
	const [loading, setLoading] = useState(false);

	const baseCurrencyDropdownRef = useRef<{ setValue: (value: string) => void }>(
		null
	);
	const targetCurrencyDropdownRef = useRef<{
		setValue: (value: string) => void;
	}>(null);

	useEffect(() => {
		if (
			listCurrencies.length > 1 &&
			baseCurrencyDropdownRef?.current &&
			targetCurrencyDropdownRef?.current
		) {
			baseCurrencyDropdownRef.current.setValue(listCurrencies[0].value);
			setBaseCurrency(listCurrencies[0].value);
			targetCurrencyDropdownRef.current.setValue(listCurrencies[1].value);
			setTargetCurrency(listCurrencies[1].value);
		}
	}, [listCurrencies]);

	const handleSwapCurrency = () => {
		if (
			baseCurrencyDropdownRef?.current &&
			targetCurrencyDropdownRef?.current
		) {
			baseCurrencyDropdownRef.current.setValue(targetCurrency);
			setBaseCurrency(targetCurrency);
			formik.values.targetCurrencyAmount &&
				formik.setFieldValue(
					"baseCurrencyAmount",
					formik.values.targetCurrencyAmount
				);

			targetCurrencyDropdownRef.current.setValue(baseCurrency);
			setTargetCurrency(baseCurrency);
			formik.values.baseCurrencyAmount &&
				formik.setFieldValue(
					"targetCurrencyAmount",
					formik.values.baseCurrencyAmount
				);
		}
	};

	const validationSchema = Yup.object({
		baseCurrencyAmount: Yup.number()
			.typeError("Value must be a number")
			.required("Required")
			.min(0, "Value must be greater than 0"),
		targetCurrencyAmount: Yup.number(),
	});

	const formik = useFormik({
		initialValues: {
			baseCurrencyAmount: "",
			targetCurrencyAmount: "",
		},
		validationSchema,
		onSubmit: (values) => {
			setLoading(true);
			getExchangeRate(baseCurrency, targetCurrency).then((rate) => {
				formik.setFieldValue(
					"targetCurrencyAmount",
					rate * Number(values.baseCurrencyAmount)
				);
				setLoading(false);
			});
		},
	});

	return (
		<div className="p-10 lg:flex justify-around items-center h-screen overflow-hidden bg-slate-200 gap-3">
			<h1 className="mb-5 font-bold text-2xl md:text-3xl lg:text-5xl text-violet-950">
				CURRENCY <br /> CONVERTER
			</h1>
			<div className="lg:w-1/2 p-10 rounded-xl bg-white border border-violet-900">
				<form
					onSubmit={formik.handleSubmit}
					className="grid grid-cols-11 gap-4"
				>
					<div className="col-span-11 md:col-span-5">
						<Dropdown
							label="From"
							ref={baseCurrencyDropdownRef}
							data={listCurrencies.map((item) => ({
								label: item.currency,
								value: item.value,
								icon: <img src={`/icons/tokens/${item.currency}.svg`} />,
							}))}
							className="mb-4 w-full"
							classNameBtn="w-full"
							onChange={(value) => {
								setBaseCurrency(value);
							}}
						/>
						<Input
							id="from-currency-amount"
							name="baseCurrencyAmount"
							placeholder="Amount"
							onChange={formik.handleChange}
							value={formik.values.baseCurrencyAmount}
							error={Boolean(formik.errors.baseCurrencyAmount)}
							helperText={formik.errors.baseCurrencyAmount}
							className="font-bold"
						/>
					</div>
					<div className="col-span-11 md:col-span-1 flex items-center justify-center">
						<div
							className="hover:cursor-pointer bg-violet-100 p-1 rounded-md"
							title="Swap"
							onClick={handleSwapCurrency}
						>
							<SwapIcon />
						</div>
					</div>
					<div className="col-span-11 md:col-span-5">
						<Dropdown
							label="To"
							ref={targetCurrencyDropdownRef}
							data={listCurrencies.map((item) => ({
								label: item.currency,
								value: item.value,
								icon: <img src={`/icons/tokens/${item.currency}.svg`} />,
							}))}
							className="mb-4 w-full"
							classNameBtn="w-full"
							onChange={(value) => {
								setTargetCurrency(value);
							}}
							key={1}
						/>
						<Input
							id="to-currency-amount"
							name="targetCurrencyAmount"
							placeholder="Amount"
							onChange={formik.handleChange}
							value={formik.values.targetCurrencyAmount}
							error={Boolean(formik.errors.targetCurrencyAmount)}
							helperText={formik.errors.targetCurrencyAmount}
							disabled
							className="hover:cursor-not-allowed font-bold"
						/>
					</div>
					<div className="col-span-11 flex justify-center items-center mt-5">
						<Button
							type="submit"
							className="md:w-1/4 bg-violet-600 hover:bg-violet-800 focus:ring-violet-300 transition-all duration-200 ease-in-out"
							loading={loading}
						>
							Submit
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default App;
