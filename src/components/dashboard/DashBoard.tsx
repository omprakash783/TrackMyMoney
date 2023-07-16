import React from "react";
import Stack from "@mui/material/Stack";

import { Layout } from "../common/Layout";
import { TransactionTable } from "../transaction/TransactionTable";
import { BalanceBox } from "../transaction/Balance";
import { IncomeBox } from "../transaction/Income";
import { ExpenseBox } from "../transaction/Expense";
import { TransactionForm } from "../form/Form";
import { useDashBoardCalcInformation } from "../../hooks/useDashBoardCalculation";

export const Dashboard = () => {
  const {
    totalBalance,
    totalIncome,
    incomeChange,
    totalExpense,
    expenseChange
  } = useDashBoardCalcInformation();

  return (
    <Layout>
      <Stack
        alignItems="center"
        gap={4}
        width={{ xs: "100vw", md: "90%" }}
        sx={{ m: "auto", my: 4 }}
      >
        <BalanceBox totalBalance={totalBalance} />
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={"center"}
          flexWrap={"wrap"}
          gap={2}
          sx={{ width: "100%" }}
        >
          <IncomeBox totalIncome={totalIncome} incomeChange={incomeChange} />
          <ExpenseBox
            totalExpense={totalExpense}
            expenseChange={expenseChange}
          />
        </Stack>
        <TransactionTable />
        <TransactionForm />
      </Stack>
    </Layout>
  );
};
