import React from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { deleteDoc, doc } from 'firebase/firestore';

import {
  Avatar,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaymentsIcon from '@mui/icons-material/Payments';

import { db } from '../../firebase/firebaseConfig';
import { useGetTransaction } from '../../hooks/useGetTransaction';
import { RootState } from '../../redux/store';

const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const TransactionTable = () => {
  const transactionData = useSelector((state: RootState) => state.trans.transactions);

  const { fetchTransactionsData } = useGetTransaction();

  const onDeleteHandler = async (itemID: string, itemName: string, itemPrice: string) => {
    try {
      await deleteDoc(doc(db, 'transactions', itemID));
      fetchTransactionsData();

      toast.success(`The item with description of ${itemName} and price ${itemPrice} is deleted successfully!`);
    } catch (error) {
      toast.error('Something went wrong while deleting!');
    }
  };

  return (
    <List
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        borderRadius: { xs: 0, md: 2.5 },
      }}
    >
      {transactionData.map((item) => (
        <React.Fragment key={item.id}>
          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            sx={{
              px: { xs: 0, md: 4 },
              borderRadius: 2.5,
              '&:hover': {
                background: '#fff3bf',
              },
            }}
          >
            <ListItem alignItems="flex-start">
              <Stack direction={'row'} gap={{ xs: 2, md: 6 }}>
                <Stack direction={'row'} gap={{ xs: 1, md: 2 }}>
                  <ListItemText
                    primary={
                      <Typography
                        variant="button"
                        color={item.expense_income === 'income' ? '#2b8a3e' : 'error'}
                        sx={{ display: 'block' }}
                      >
                        {month[new Date(item.date).getMonth()]}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="button"
                        color={item.expense_income === 'income' ? '#2b8a3e' : 'error'}
                        sx={{ ml: 0.5 }}
                      >
                        {new Date(item.date).getDate()}
                      </Typography>
                    }
                  />
                  <Typography
                    variant="button"
                    color={item.expense_income === 'income' ? '#2b8a3e' : 'error'}
                    m="auto"
                    fontWeight={700}
                  >
                    {new Date(item.date).getFullYear()}
                  </Typography>
                </Stack>

                <ListItemAvatar>
                  <Avatar alt="Bills/ Expense" variant="square">
                    {item.expense_income === 'expense' ? (
                      <ShoppingCartIcon color="error" />
                    ) : (
                      <PaymentsIcon color="success" />
                    )}
                  </Avatar>
                </ListItemAvatar>
              </Stack>

              <ListItemText
                primary={
                  <Typography color={item.expense_income === 'income' ? '#2b8a3e' : 'error'} fontWeight={700}>
                    {item.category}
                  </Typography>
                }
                secondary={
                  <Typography color={item.expense_income === 'income' ? '#2b8a3e' : 'error'} fontWeight={600}>
                    You have {item.expense_income === 'income' ? 'earned' : 'paid'} $ {item.amount}
                  </Typography>
                }
                color="error"
                sx={{ ml: 'auto' }}
              />
              <ListItemText
                secondary={
                  <Typography color={item.expense_income === 'income' ? '#2b8a3e' : 'error'} fontWeight={600}>
                    {item.desc}
                  </Typography>
                }
                color="error"
                sx={{ ml: 'auto', mt: 'auto' }}
              />
            </ListItem>
            <IconButton size="large" onClick={() => onDeleteHandler(item.id, item.desc, item.amount)}>
              <DeleteIcon color="error" />
            </IconButton>
          </Stack>
          <Divider sx={{ borderBottomWidth: 4 }} />
        </React.Fragment>
      ))}
    </List>
  );
};
