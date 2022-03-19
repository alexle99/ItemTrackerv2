import { useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
import { Integer } from 'type-fest';
import { v4 as uuid } from 'uuid';
import { AccountSidebar, ItemDisplay, Navbar, SaveState } from '@/components';
import { Account, Item } from '@/types/account';

const initialAddFruits = [
  'Mochi',
  'Tori',
  'Pika',
  'Magu',
  'Mera',
  'Ito',
  'Goro',
  'Hie',
  'Suna',
  'Gura',
  'Zushi',
];
const initialAddItems = [
  'Pbag',
  'Jester Outfit',
  'Cupid Queen Outfit',
  'Flowers',
  'Elo Hammer',
  'Drums',
  'Croc Cape',
  'Both cores',
  'Striker',
  'Coffin',
  'Hover',
];

const actualAccounts = [
  'HAHAFAILUREJL',
  'HAHAFAILUREOG',
  'JackofAllStonks',
  'Hotakiu',
  'EmeraldyFan',
  'FakeVibeQ',
  'breuimarealhuman',
  'the_fakerobot',
  'ElectrifiedTape',
  'kjghk5j43509i',
  'gkdjhsgadigi5',
];

const createAccounts = (accountList: string[]): Account[] => {
  const result: Account[] = [];
  for (const i in accountList) {
    const account: Account = {
      id: uuid(),
      userName: accountList[i],
      items: [],
    };
    result.push(account);
  }
  return result;
};

export const App = () => {
  const [accounts, setAccounts] = useState<Account[]>(
    createAccounts(actualAccounts)
  );
  const [selectedAccount, setSelectedAccount] = useState<Account | undefined>();
  const [counter, setCounter] = useState<number>(0);
  const handleSelected = (account: Account) => {
    setSelectedAccount(account);
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

  const handleSave = () => {
    localStorage.setItem('accounts', JSON.stringify(accounts));
  };

  const handleLoad = () => {
    const object: string | null = localStorage.getItem('accounts');
    if (object === null) {
      console.log('NO SAVED DATA');
    } else {
      const objectParse = JSON.parse(object);
      console.table(objectParse);
      console.log(objectParse);
      setAccounts(objectParse);
    }
  };

  return (
    <Box>
      <Navbar />
      <SaveState handleSave={handleSave} handleLoad={handleLoad} />
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 5fr' }}>
        <Box sx={{ border: '1px white solid' }}>
          <AccountSidebar
            accounts={accounts}
            onSelect={handleSelected}
            currentSelected={selectedAccount}
          />
        </Box>
        <Box sx={{ border: '3px white solid' }}>
          {selectedAccount && (
            <ItemDisplay
              items={selectedAccount?.items}
              addItemsList={initialAddItems}
              addFruitsList={initialAddFruits}
              addItemToItemList={addItemToItemList}
              removeItemFromItemList={removeItemFromItemList}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};
