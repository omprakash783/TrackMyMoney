import React from "react";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";

import { FormDataType } from "../components/form/Form";
import { db } from "../firebase/firebaseConfig";
import { useGetTransaction } from "./useGetTransaction";

interface PostDataType extends FormDataType {
  expense_income: string;
}

export const usePostTransaction = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const { fetchTransactionsData } = useGetTransaction();

  const sendTransactionData = async (data: PostDataType) => {
    setIsLoading(true);
    try {
      await addDoc(collection(db, "transactions"), {
        ...data
      });

      fetchTransactionsData();
      setIsLoading(false);
      toast.success("The transaction has been added successfully.");
    } catch (error) {
      toast.error(`error`);
    }
  };

  return { sendTransactionData, isLoading };
};
