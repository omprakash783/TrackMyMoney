import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Box, Modal, Typography, useMediaQuery } from '@mui/material';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import LoadingButton from '@mui/lab/LoadingButton';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import PaymentsIcon from '@mui/icons-material/Payments';

import { IconInputField } from '../common/TextInput';
import { inputFields } from './InputList';
import { schema } from './Validation';
import { usePostTransaction } from '../../hooks/usePostTranscation';
import { useTheme } from '../../theme/useTheme';

export interface FormDataType {
  desc: string;
  amount: string;
  category: string;
  date: Date | string;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '100vw', md: 400 },
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export const TransactionForm: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);

  const [tabValue, setTabValue] = React.useState<string>('income');

  const methods = useForm({
    defaultValues: {
      desc: '',
      amount: '',
      category: '',
      date: '',
    },
    resolver: zodResolver(schema),
  });

  const onTabChangeHandler = (event: React.SyntheticEvent<Element, Event>, newValue: string) => {
    setTabValue(newValue);
  };

  const { sendTransactionData, isLoading } = usePostTransaction();

  const onTransactionFormHandler: SubmitHandler<FormDataType> = (data) => {
    sendTransactionData({ ...data, expense_income: tabValue });
    setOpen(false);
    methods.reset({
      desc: '',
      amount: '',
      category: '',
      date: '',
    });
  };

  const { theme } = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <React.Fragment>
      <Button
        variant="contained"
        size="large"
        startIcon={<PaymentsIcon />}
        onClick={() => setOpen(true)}
        disableElevation
        sx={{
          px: 8,
          borderRadius: 2.5,
          width: smallScreen ? '95%' : '45%',
        }}
      >
        {' '}
        <Box>
          Add
          <Typography variant="button" component={'span'} sx={{ color: 'red' }}>
            {' '}
            Expense
          </Typography>
          /
          <Typography variant="button" component={'span'} sx={{ color: 'green' }}>
            {' '}
            Income
          </Typography>
        </Box>
      </Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper
          elevation={smallScreen ? 0 : 10}
          sx={{
            borderRadius: { xs: 0, md: 5 },
            background: tabValue === 'income' ? '#b2f2bb' : '#ffc9c9',
            ...style,
          }}
        >
          <FormProvider {...methods}>
            <Stack gap={2} component="form" noValidate onSubmit={methods.handleSubmit(onTransactionFormHandler)}>
              <TabContext value={tabValue}>
                <TabList onChange={onTabChangeHandler} variant="fullWidth" aria-label="Movie Tab" color="secondary">
                  <Tab
                    label="Income"
                    value="income"
                    sx={{
                      color: 'green',
                      fontWeight: 700,
                    }}
                  />
                  <Tab label="Expense" value="expense" sx={{ color: 'red', fontWeight: 700 }} />
                </TabList>
              </TabContext>

              {inputFields.map((item) => (
                <IconInputField key={item.id} {...item} />
              ))}
              <LoadingButton
                variant="contained"
                type="submit"
                startIcon={<AddIcon />}
                color={tabValue === 'income' ? 'success' : 'error'}
                loading={isLoading}
                loadingIndicator="Adding..."
              >
                Add {tabValue === 'income' ? 'Income' : 'Expense'}
              </LoadingButton>
            </Stack>
          </FormProvider>
        </Paper>
      </Modal>
    </React.Fragment>
  );
};
