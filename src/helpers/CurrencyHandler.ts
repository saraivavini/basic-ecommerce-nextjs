function toCurrency(value: number) {
  return `$ ${Number(value).toFixed(2)}`;
}

const CurrencyHandler = {
  toCurrency,
}

export default CurrencyHandler;
