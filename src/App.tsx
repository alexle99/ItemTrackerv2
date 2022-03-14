import { useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
import { v4 as uuid } from 'uuid';
import { AccountSidebar, ItemDisplay, Navbar } from '@/components';
import { Account, Item } from '@/types/account';

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
  const [accounts, setAccounts] = useState<Account[]>([a1, a2, a3]);
  const [selectedAccount, setSelectedAccount] = useState<Account | undefined>();

  const handleSelected = (account: Account) => {
    setSelectedAccount(account);
  };

  const randomItems = (quantity: number): Item[] => {
    const items: Item[] = [];
    for (let i = 0; i < quantity; i++) {
      const item: Item = { id: uuid(), name: 'Item ' + i };
      items.push(item);
    }
    return items;
  };

  const addRandomAccounts = (quantity: number) => {
    const account: Account = {
      id: uuid(),
      userName: 'Account' + accounts.length,
      items: randomItems(accounts.length * 2),
    };
    setAccounts((prev) => [...prev, account]);
  };

  return (
    <Box>
      <Navbar />
      <Button
        variant="contained"
        sx={{ width: '100%' }}
        onClick={() => addRandomAccounts(10)}
      >
        ADD RANDOM ACCOUNTS
      </Button>

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 5fr' }}>
        <Box sx={{ border: '1px white solid' }}>
          <AccountSidebar accounts={accounts} onSelect={handleSelected} />
        </Box>
        <Box sx={{ border: '1px pink solid' }}>
          <ItemDisplay items={selectedAccount?.items} />
        </Box>
      </Box>
    </Box>
  );
};
