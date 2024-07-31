/*
Provide 3 unique implementations of the following function in JavaScript.
**Input**: `n` - any integer
*Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`*.
**Output**: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`.
*/

// Iterative Approach
// Using for loop or while loop
// Time Complexity: O(n)
// Space Complexity: O(1)
function sum_to_n_a(n) {
	let sum = 0;
	for (let i = 1; i <= n; i++) {
		sum += i;
	}
	return sum;
}

// Recursive Approach
// Time Complexity: O(n)
// Space Complexity: O(n)
function sum_to_n_b(n) {
	if (n === 1) {
		return 1;
	}
	return n + sum_to_n_b(n - 1);
}

// Mathematical Formula Approach
// Time Complexity: O(1)
// Space Complexity: O(1)
function sum_to_n_c(n) {
	return (n * (n + 1)) / 2;
}

function main() {
	console.log(sum_to_n_a(10));
	console.log(sum_to_n_a(10));
	console.log(sum_to_n_a(10));
}

main();
