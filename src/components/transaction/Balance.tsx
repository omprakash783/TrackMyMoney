import React from "react";

import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

interface Props {
  totalBalance: number;
}

export const BalanceBox: React.FC<Props> = ({ totalBalance }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 2,
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginTop: "30px"
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ width: { xs: "95%", md: "45%" } }}
      >
        <Typography variant="h4" fontWeight={700}>
          My Balance
        </Typography>
        <Typography
          variant="h3"
          fontWeight={700}
          color={totalBalance >= 0 ? "text.secondary" : "error"}
        >
          {totalBalance >= 0 ? "+" : "-"} $ {Math.abs(totalBalance)}
        </Typography>
      </Stack>
    </Paper>
  );
};
