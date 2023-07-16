import React from "react";
import { useDispatch } from "react-redux";
import { collection, getDocs, query } from "firebase/firestore";
import { toast } from "react-toastify";

import { db } from "../firebase/firebaseConfig";
import { transActions } from "../redux/transactionSlice";

interface OutputDataType {
  [name: string]: string;
}

export const useGetTransaction = () => {
  const dispatch = useDispatch();

  const fetchTransactionsData = React.useCallback(async () => {
    try {
      const q = query(collection(db, "transactions"));
      const querySnapshot = await getDocs(q);

      let trans: OutputDataType[] = [];

      querySnapshot.forEach((doc) => {
        const { id } = doc;

        const data = { ...doc.data(), id };
        trans.push(data);
      });

      trans.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      dispatch(transActions.setTrans(trans));
    } catch (error) {
      toast.error("Fetching Transaction Failed!");
    }
  }, [dispatch]);

  return { fetchTransactionsData };
};
