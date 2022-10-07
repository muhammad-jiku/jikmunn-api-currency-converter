import axios from 'axios';
import express from 'express';

// using express
const app = express();

// adding port
const port = process.env.PORT || 5001;

const getCountries = async (currencyCode) => {
  try {
    const response = await axios.get(
      `https://restcountries.com/v3.1/currency/${currencyCode}`
    );

    return response.data.map((country) => country.name.common);
  } catch (error) {
    throw new Error(`Unable to get countries that use ${currencyCode}`);
  }
};

const convertCurrency = async (fromCurrency, toCurrency, amount) => {
  const countries = await getCountries(toCurrency);
  const convertedAmount = (amount * Math.random() * 11).toFixed(2);

  return `${amount} ${fromCurrency} is worth ${convertedAmount} ${toCurrency}. You can spend these in the following countries: ${countries}`;
};

app.get('/', async (req, res) => {
  const currencyData = await convertCurrency('USD', 'CHF', 20);
  res.send(currencyData);
});

// convertCurrency('USD', 'CHF', 20)
//   .then((data) => console.log(data))
//   .catch((error) => console.log(error));

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
