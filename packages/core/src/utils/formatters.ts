
export const formatDateID = (dateString: string, options: Intl.DateTimeFormatOptions): string => {
  try {
    return new Date(dateString).toLocaleDateString('id-ID', options);
  } catch (e) {
    return dateString;
  }
};

export const getDayFromDate = (dateString: string): number => {
  return new Date(dateString).getDate();
};

export const getMonthYearID = (dateString: string): string => {
  return formatDateID(dateString, { month: 'short', year: 'numeric' }).toUpperCase();
};

export const getMonthShortID = (dateString: string): string => {
  return formatDateID(dateString, { month: 'short' }).toUpperCase();
};

export const formatCurrencyIDR = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', { 
    style: 'currency', 
    currency: 'IDR', 
    maximumFractionDigits: 0 
  }).format(amount);
};
