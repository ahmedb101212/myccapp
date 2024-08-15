// Your ExchangeRate-API key and base API URL
const API_KEY = '7821111368c2fe0baac9197b';
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`;

// Function to fetch real-time exchange rates and convert currency
async function convertCurrency(amount, fromCurrency, toCurrency) {
    try {
        // Fetch exchange rates from the API for the base currency
        const response = await fetch(`${BASE_URL}${fromCurrency}`);
        const data = await response.json();

        // Check if the API call was successful
        if (data.result !== 'success') {
            throw new Error('Failed to fetch exchange rates');
        }

        // Get the conversion rate for the target currency
        const conversionRate = data.conversion_rates[toCurrency];
        if (!conversionRate) {
            throw new Error(`Conversion rate not available for ${toCurrency}`);
        }

        // Perform the currency conversion
        const convertedAmount = (amount * conversionRate).toFixed(2);
        return `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    } catch (error) {
        console.error('Error:', error.message);
        return 'Unable to perform conversion at this time. Please try again later.';
    }
}

// Example usage of the convertCurrency function
document.getElementById('convert-btn').addEventListener('click', async function() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('from-currency').value.split(" ")[0];
    const toCurrency = document.getElementById('to-currency').value.split(" ")[0];

    if (amount === '' || isNaN(amount)) {
        alert('Please enter a valid amount');
        return;
    }

    // Call the convertCurrency function and display the result
    const result = await convertCurrency(amount, fromCurrency, toCurrency);
    document.getElementById('result').textContent = result;
});
