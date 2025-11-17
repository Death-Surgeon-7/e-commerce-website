"use client";

import React, { createContext, useContext, useState, useMemo } from 'react';

// Define the shape of a currency
export interface Currency {
  code: 'INR' | 'USD' | 'EUR' | 'GBP';
  symbol: 'Rs.' | '$' | '€' | '£';
  locale: 'en-IN' | 'en-US' | 'de-DE' | 'en-GB';
  // Exchange rate relative to INR (base currency)
  rate: number; 
}

// Define the list of available currencies
export const currencies: Currency[] = [
  { code: 'INR', symbol: 'Rs.', locale: 'en-IN', rate: 1 },
  { code: 'USD', symbol: '$', locale: 'en-US', rate: 1 / 83 },
  { code: 'EUR', symbol: '€', locale: 'de-DE', rate: 1 / 90 },
  { code: 'GBP', symbol: '£', locale: 'en-GB', rate: 1 / 105 },
];

const defaultCurrency = currencies[0]; // Default to INR

// Define the shape of the context
interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (amountInr: number) => string;
}

// Create the context
const CurrencyContext = createContext<CurrencyContextType>({
  currency: defaultCurrency,
  setCurrency: () => {},
  formatPrice: () => '',
});

// Create a provider component
export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>(defaultCurrency);

  const formatPrice = useMemo(() => {
    return (amountInr: number) => {
      const convertedAmount = amountInr * currency.rate;
      if (currency.code === 'INR') {
        return `Rs. ${new Intl.NumberFormat('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(convertedAmount)}`;
      }
      return new Intl.NumberFormat(currency.locale, {
        style: 'currency',
        currency: currency.code,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(convertedAmount);
    };
  }, [currency]);
  
  const value = {
    currency,
    setCurrency,
    formatPrice,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

// Create a custom hook for using the context
export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
