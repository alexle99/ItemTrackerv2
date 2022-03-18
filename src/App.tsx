import { useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
import { v4 as uuid } from 'uuid';
import { AccountSidebar, ItemDisplay, Navbar } from '@/components';
import { Account, Item } from '@/types/account';

const addItemList = ['item1', 'item2', 'item3', 'item4', 'item5'];
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
const randomItems = (quantity: number): Item[] => {
  const items: Item[] = [];
  for (let i = 0; i < quantity; i++) {
    const item: Item = { id: uuid(), name: 'Item ' + i };
    items.push(item);
  }
  return items;
};
export const App = () => {
  const [accounts, setAccounts] = useState<Account[]>([a1, a2, a3]);
  const [selectedAccount, setSelectedAccount] = useState<Account | undefined>();
  const handleSelected = (account: Account) => {
    setSelectedAccount(account);
  };
  const addRandomAccounts = () => {
    const account: Account = {
      id: uuid(),
      userName: 'Account' + accounts.length,
      items: randomItems(accounts.length * 2),
    };
    setAccounts((prev) => [...prev, account]);
  };
  const addItemToItemList = (itemName: string) => {
    const item: Item = {
      id: uuid(),
      name: itemName,
    };
    for (const a in accounts) {
      if (accounts[a].userName === selectedAccount?.userName) {
        accounts[a].items.push(item);
        setAccounts(() => [...accounts]);
        break;
      }
    }
  };
  const removeItemFromItemList = (itemToRemove: Item) => {
    for (const a in accounts) {
      if (accounts[a].userName === selectedAccount?.userName) {
        accounts[a].items = accounts[a].items.filter((item) => {
          return item !== itemToRemove;
        });
        setAccounts(() => [...accounts]);
        return;
      }
    }
  };
  return (
    <Box>
      <Navbar />
      <Button
        variant="contained"
        sx={{ width: '100%' }}
        onClick={() => addRandomAccounts()}
      >
        ADD RANDOM ACCOUNTS
      </Button>
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 5fr' }}>
        <Box sx={{ border: '1px white solid' }}>
          <AccountSidebar accounts={accounts} onSelect={handleSelected} />
        </Box>
        <Box sx={{ border: '1px pink solid' }}>
          {selectedAccount && (
            <ItemDisplay
              items={selectedAccount?.items}
              addItemsList={addItemList}
              addItemToItemList={addItemToItemList}
              removeItemFromItemList={removeItemFromItemList}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

// export const App = () => {
//   return <h1>CHICKEN</h1>;
// };
