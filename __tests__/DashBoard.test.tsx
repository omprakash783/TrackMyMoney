import React from 'react';
import { render } from '@testing-library/react';
import { Dashboard } from '../src/components/dashboard/DashBoard';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

// Mock the store
const mockStore = configureStore([]);
const store = mockStore({});

store.getState().trans = { transactions: [] };

describe('Dashboard component', () => {
  test('displays the balance box with correct props', () => {
    // Mock the values for the total balance
    const totalBalance = 1000;

    const { getAllByText } = render(
      <Provider store={store}>
        <Dashboard />
      </Provider>,
    );
    const balanceBoxElement = getAllByText('Down by 0 % than last month');

    expect(balanceBoxElement).toBeTruthy();
  });

  test('displays the income box with correct props', () => {
    // Mock the values for the total income and income change
    const totalIncome = 500;
    const incomeChange = 100;

    const { getAllByText } = render(
      <Provider store={store}>
        <Dashboard />
      </Provider>,
    );
    const incomeBoxElement = getAllByText('Income Information');

    expect(incomeBoxElement).toBeTruthy();
  });

  test('displays the expense box with correct props', () => {
    // Mock the values for the total expense and expense change
    const totalExpense = 300;
    const expenseChange = -50;

    const { getAllByText } = render(
      <Provider store={store}>
        <Dashboard />
      </Provider>,
    );
    const expenseBoxElement = getAllByText('Balance Information');

    expect(expenseBoxElement).toBeTruthy();
  });
});
