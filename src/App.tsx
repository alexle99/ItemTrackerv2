import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { v4 as uuid } from 'uuid';
import {
  AccountSidebar,
  Header,
  ItemDisplay,
  Navbar,
  SaveState,
} from '@/components';
import { Account, Item } from '@/types/account';

const initialAddItems = [
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
const initialAddFruits = [
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

const itemList = [initialAddItems, initialAddFruits];

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
  const [savedState, setSavedState] = useState(false);

  useEffect(() => {
    setSavedState(false);
  }, [accounts]);

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
    setSavedState(true);
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
      <Navbar
        handleSave={handleSave}
        handleLoad={handleLoad}
        savedState={savedState}
      />
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 5fr' }}>
        <Box>
          <AccountSidebar
            accounts={accounts}
            onSelect={handleSelected}
            currentSelected={selectedAccount}
          />
        </Box>
        <Box>
          <ItemDisplay
            items={selectedAccount?.items}
            addItemsList={itemList}
            addItemToItemList={addItemToItemList}
            removeItemFromItemList={removeItemFromItemList}
            selectedAccount={selectedAccount}
          />
        </Box>
      </Box>
    </Box>
  );
};
