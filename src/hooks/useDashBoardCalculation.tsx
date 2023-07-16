import React from 'react';
import { useSelector } from 'react-redux';

import { useGetTransaction } from './useGetTransaction';
import { RootState } from '../redux/store';

interface FuncRetDataType {
  totalBalance: number;
  totalIncome: number;
  incomeChange: number;
  totalExpense: number;
  expenseChange: number;
}

export const useDashBoardCalcInformation = (): FuncRetDataType => {
  const { fetchTransactionsData } = useGetTransaction();

  React.useEffect(() => {
    fetchTransactionsData();
  }, [fetchTransactionsData]);

  const transactionData = useSelector((state: RootState) => state.trans.transactions);

  const totalIncome = transactionData.reduce(
    (accumulator, currentValue) => accumulator + (currentValue.expense_income === 'income' ? +currentValue.amount : 0),
    0,
  );

  const totalExpense = transactionData.reduce(
    (accumulator, currentValue) => accumulator + (currentValue.expense_income === 'expense' ? +currentValue.amount : 0),
    0,
  );

  const totalBalance = totalIncome - totalExpense;

  /* ---------------------------- Change Percentage --------------------------- */
  const thisMonth = new Date().getMonth();
  const prevMonth = thisMonth === 0 ? 11 : thisMonth - 1;

  // For Income Change
  const totalIncomeThisMonth = transactionData.reduce((accumulator, currentValue) => {
    let val = 0;

    if (new Date(currentValue.date).getMonth() === thisMonth) {
      val = +currentValue.amount;
    }
    return accumulator + (currentValue.expense_income === 'income' ? val : 0);
  }, 0);

  const totalIncomePrevMonth = transactionData.reduce((accumulator, currentValue) => {
    let val = 0;

    if (new Date(currentValue.date).getMonth() === prevMonth) {
      val = +currentValue.amount;
    }
    return accumulator + (currentValue.expense_income === 'income' ? val : 0);
  }, 0);

  const incomeChange =
    ((totalIncomeThisMonth - totalIncomePrevMonth) * 100) / (totalIncomePrevMonth === 0 ? 1 : totalIncomePrevMonth);

  // Expense Change
  const totalExpenseThisMonth = transactionData.reduce((accumulator, currentValue) => {
    let val = 0;

    if (new Date(currentValue.date).getMonth() === thisMonth) {
      val = +currentValue.amount;
    }
    return accumulator + (currentValue.expense_income === 'expense' ? val : 0);
  }, 0);

  const totalExpensePrevMonth = transactionData.reduce((accumulator, currentValue) => {
    let val = 0;

    if (new Date(currentValue.date).getMonth() === prevMonth) {
      val = +currentValue.amount;
    }
    return accumulator + (currentValue.expense_income === 'expense' ? val : 0);
  }, 0);

  const expenseChange =
    ((totalExpenseThisMonth - totalExpensePrevMonth) * 100) / (totalExpensePrevMonth === 0 ? 1 : totalExpensePrevMonth);

  return {
    totalBalance,
    totalIncome,
    incomeChange,
    totalExpense,
    expenseChange,
  };
};
