import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useDispatch } from 'react-redux';
import { collection, getDocs, query } from 'firebase/firestore';
import { toast } from 'react-toastify';

import { db } from '../src/firebase/firebaseConfig';
import { transActions } from '../src/redux/transactionSlice';
import { useGetTransaction } from '../src/hooks/useGetTransaction';

// Mock the dependencies
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  getDocs: jest.fn(),
  query: jest.fn(),
}));
jest.mock('../src/firebase/firebaseConfig', () => ({
  db: jest.fn(),
}));
jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
}));
jest.mock('../src/redux/transactionSlice', () => ({
  transActions: {
    setTrans: jest.fn(),
  },
}));

describe('useGetTransaction', () => {
  test('fetches transaction data and dispatches actions correctly', async () => {
    // Mock the necessary dependencies
    const dispatchMock = jest.fn();
    const useDispatchMock = useDispatch as jest.Mock;
    useDispatchMock.mockReturnValue(dispatchMock);

    const getDocsMock = getDocs as jest.Mock;
    const queryMock = query as jest.Mock;
    const collectionMock = collection as jest.Mock;
    const dbMock = db as jest.Mock;
    const toastErrorMock = jest.spyOn(toast, 'error');
    const setTransMock = jest.spyOn(transActions, 'setTrans');

    // Mock the query snapshot and its behavior
    const querySnapshotMock = {
      forEach: jest.fn(),
    };
    getDocsMock.mockResolvedValue(querySnapshotMock);

    // Mock the transaction data
    const transactionData = [
      { id: '1', name: 'Transaction 1' },
      { id: '2', name: 'Transaction 2' },
    ];

    // Simulate the forEach loop behavior
    querySnapshotMock.forEach.mockImplementation((callback) => {
      transactionData.forEach((data) => {
        callback({ data, id: data.id });
      });
    });

    const { result, waitForNextUpdate } = renderHook(() => useGetTransaction());

    // Call the fetchTransactionsData function
    result.current.fetchTransactionsData();

    // Wait for the hook to finish the asynchronous execution
    await waitForNextUpdate();

    // Assertions
    expect(collectionMock).toHaveBeenCalledWith(dbMock, 'transactions');
    expect(queryMock).toHaveBeenCalled();
    expect(getDocsMock).toHaveBeenCalled();
    expect(querySnapshotMock.forEach).toHaveBeenCalledTimes(transactionData.length);
    expect(setTransMock).toHaveBeenCalledWith(transactionData);
    expect(toastErrorMock).not.toHaveBeenCalled();
    expect(dispatchMock).toHaveBeenCalledWith(transActions.setTrans(transactionData));
  });
});
