import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { v4 as uuid } from 'uuid';
import { AccountSidebar, ItemDisplay, Navbar } from '@/components';
import { Account, Item } from '@/types/account';
import { ConfirmationDialog } from './components/ConfirmationDialog';

const Fruits = [
  'Fruits',
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

const Unobtainables = [
  'Unobtainables',
  'candy cane',
  'prestige bag',
  'jester outfit',
  'jester scythe',
  'baal head',
  'fang',
  'flowers',
  'elo hammer',
  'elo egg',
  'elo other eggs',
  'santa bells',
  'santa hat',
  'elf hat',
  'cupid queen outfit',
  'other cupid drops',
  'gift of lancer',
  'festival lancer',
  'festival shield',
];

const Boats = ['Boats', 'striker', 'coffin', 'hover', 'flamingo boat'];

const KrakenStuff = [
  'Kraken Stuff',
  'both cores',
  'kraken core',
  'sb core',
  'red kraken set',
  'gold kraken set',
  'green kraken set',
  'blue kraken set',
  'purple kraken set',
  'azure kk armor',
  'azure kk gs',
  'azure cape',
  'azure katana',
];

const Other = [
  'other',
  'drums',
  'croc cape',
  'wb cape',
  'marine cape',
  'gravito blade',
  'trident',
  'bisento',
  'cutlass',
  'kiribachi',
  'cho crown',
  'pole',
  'golden hook',
  'neptune crown',
  'musashi set',
  'musashi hat',
  'karuta',
  'spare fruit bag',
];

const itemList = [Fruits, Unobtainables, Boats, KrakenStuff, Other];

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

const dummyFunction = () => {
  console.log('DUMMY FUNCTION');
};

const defaultAction = {
  text: '',
  open: false,
  actionFunction: dummyFunction,
};

export const App = () => {
  const [accounts, setAccounts] = useState<Account[]>(
    createAccounts(actualAccounts)
  );
  const [selectedAccount, setSelectedAccount] = useState<Account | undefined>();
  const [savedState, setSavedState] = useState(false);
  const [action, setAction] = useState(defaultAction);

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

  const saveAction = {
    text: 'Save',
    open: true,
    actionFunction: handleSave,
  };

  const loadAction = {
    text: 'Load',
    open: true,
    actionFunction: handleLoad,
  };

  const handleToggleDialog = (actionText: string) => {
    if (actionText === 'save') {
      setAction(saveAction);
    } else if (actionText === 'load') {
      setAction(loadAction);
    } else {
      setAction(defaultAction);
    }
  };

  return (
    <Box>
      <Navbar savedState={savedState} toggleDialog={handleToggleDialog} />
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 5fr' }}>
        <AccountSidebar
          accounts={accounts}
          onSelect={handleSelected}
          currentSelected={selectedAccount}
        />
        <ItemDisplay
          items={selectedAccount?.items}
          addItemsList={itemList}
          addItemToItemList={addItemToItemList}
          removeItemFromItemList={removeItemFromItemList}
          selectedAccount={selectedAccount}
        />
        <ConfirmationDialog
          titleText={action.text}
          open={action.open}
          onClose={() => handleToggleDialog('')}
          onYes={action.actionFunction}
        />
      </Box>
    </Box>
  );
};
