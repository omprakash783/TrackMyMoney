import React from 'react';
import InfoIcon from '@mui/icons-material/Info';
import PaymentsIcon from '@mui/icons-material/Payments';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CategoryIcon from '@mui/icons-material/Category';

export const inputFields = [
  {
    id: 'description',
    label: 'Description',
    type: 'text',
    name: 'desc',
    startIcon: <InfoIcon />,
    endIcon: <></>,
    endIconSwap: <></>,
    autoFocus: true,
    required: true,
  },
  {
    id: 'amount',
    label: 'Amount',
    type: 'number',
    name: 'amount',
    startIcon: <PaymentsIcon />,
    endIcon: <></>,
    endIconSwap: <></>,
    required: true,
    autoFocus: false,
  },
  {
    id: 'category',
    label: 'Category',
    type: 'text',
    name: 'category',
    startIcon: <CategoryIcon />,
    endIcon: <></>,
    endIconSwap: <></>,
    autoFocus: true,
    required: true,
  },
  {
    id: 'date',
    label: '',
    type: 'date',
    name: 'date',
    startIcon: <CalendarMonthIcon />,
    endIcon: <></>,
    endIconSwap: <></>,
    required: true,
    autoFocus: false,
  },
];
