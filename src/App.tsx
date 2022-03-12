import { useState } from 'react';
import { Box } from '@mui/material';
import { v4 as uuid } from 'uuid';
import { AccountSidebar, ItemDisplay, Navbar } from '@/components';
import { Account } from '@/types/account';

const a1: Account = {
  id: uuid(),
  userName: 'john',
  items: [{ id: uuid(), name: 'bat' }],
};

const a2: Account = {
  id: uuid(),
  userName: 'bob',
  items: [{ id: uuid(), name: 'gun' }],
};

const a3: Account = {
  id: uuid(),
  userName: 'alex',
  items: [{ id: uuid(), name: 'orange peel' }],
};

export const App = () => {
  const accounts = [a1, a2, a3];
  const [selected, setSelected] = useState('');

  const handleSelected = (id: string) => {
    console.log(id);
  };

  return (
    <Box>
      <Navbar />
      <AccountSidebar accounts={accounts} onSelect={handleSelected} />
      <ItemDisplay />
    </Box>
  );
};
