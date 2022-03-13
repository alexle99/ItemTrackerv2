import { useState } from 'react';
import { Box, Button } from '@mui/material';
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
      <Button variant="contained" onClick={() => addRandomAccounts(10)}>
        ADD RANDOM ACCOUNTS
      </Button>
      <AccountSidebar accounts={accounts} onSelect={handleSelected} />
      <ItemDisplay items={selectedAccount?.items} />
    </Box>
  );
};
