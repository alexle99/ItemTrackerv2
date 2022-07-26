import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { v4 as uuid } from 'uuid';
import { AccountSidebar, ItemDisplay, Navbar } from '@/components';
import { Account, Category, Item } from '@/types/account';
import { ConfirmationDialog } from './components/ConfirmationDialog';

// const Fruits = [
//   'Fruits',
//   'Mochi',
//   'Kage',
//   'Paw',
//   'Yomi',
//   'Tori',
//   'Pika',
//   'Magu',
//   'Mera',
//   'Ito',
//   'Goro',
//   'Hie',
//   'Suna',
//   'Gura',
//   'Zushi',
// ];

// const Unobtainables = [
//   'Unobtainables',
//   'candy cane',
//   'prestige bag',
//   'jester outfit',
//   'jester scythe',
//   'baal head',
//   'fang',
//   'jester hat',
//   'jester box',
//   'baal cape',
//   'flowers',
//   'elo hammer',
//   'elo egg',
//   'elo other eggs',
//   'santa bells',
//   'santa hat',
//   'elf hat',
//   'cupid queen outfit',
//   'other cupid drops',
//   'gift of lancer',
//   'festival lancer',
//   'festival shield',
//   'festival gifts',
// ];

// const Boats = ['Boats', 'striker', 'coffin', 'hover', 'flamingo boat'];

// const KrakenStuff = [
//   'Kraken Stuff',
//   'both cores',
//   'kraken core',
//   'sb core',
//   'red kraken set',
//   'gold kraken set',
//   'green kraken set',
//   'blue kraken set',
//   'purple kraken set',
//   'azure kk armor',
//   'azure kk gs',
//   'azure cape',
//   'azure katana',
//   'red sb set',
//   'blue sb set',
//   'green sb set',
// ];

// const Other = [
//   'other',
//   'drums',
//   'croc cape',
//   'wb cape',
//   'marine cape',
//   'gravito blade',
//   'gravito cape',
//   'trident',
//   'bisento',
//   'cutlass',
//   'kiribachi',
//   'cho crown',
//   'pole',
//   'golden hook',
//   'neptune crown',
//   'musashi set',
//   'musashi hat',
//   'karuta',
//   'spare fruit bag',
//   'max sp resets',
//   'max dark roots',
// ];

// const Other2 = [
//   'Other2',
//   "Ba'al core",
//   'squid game set',
//   'anniversary lantern',
//   'anniversary cap',
//   'anniversary hat',
//   'anniversary shades',
//   'golden hammer',
//   'buggy cape',
//   'cupid queen wings',
//   'karoo',
//   'mini bunny',
// ];

// const ALL_ITEMS_STRING = [
//   Fruits,
//   Unobtainables,
//   Boats,
//   KrakenStuff,
//   Other,
//   Other2,
// ];

const fruitCategory: Category = {
  id: uuid(),
  name: 'Fruits',
  items: [
    { id: uuid(), name: 'Mochi', exists: true },
    { id: uuid(), name: 'Kage', exists: false },
    { id: uuid(), name: 'Paw', exists: true },
  ],
};

const unobtainablesCategory: Category = {
  id: uuid(),
  name: 'Unobtainables',
  items: [
    { id: uuid(), name: 'candy cane', exists: true },
    { id: uuid(), name: 'prestige bag', exists: true },
    { id: uuid(), name: 'jester outfit', exists: true },
  ],
};

const boatsCategory: Category = {
  id: uuid(),
  name: 'Boats',
  items: [
    { id: uuid(), name: 'striker', exists: false },
    { id: uuid(), name: 'coffin', exists: true },
    { id: uuid(), name: 'hover', exists: true },
  ],
};

const emptyCategory: Category = {
  id: uuid(),
  name: 'Empty',
  items: [],
};

const actualCategories: Category[] = [
  fruitCategory,
  unobtainablesCategory,
  emptyCategory,
  boatsCategory,
];

const defaultAction = {
  text: '',
  open: false,
  actionFunction: () => {
    console.log('dummy function');
  },
};

const dummyAccount: Account = {
  id: 'asdf',
  userName: 'chicken',
  categories: actualCategories,
};

export const App = () => {
  const [accounts, setAccounts] = useState<Account[]>([dummyAccount]);
  const [selectedAccount, setSelectedAccount] = useState<Account>(dummyAccount);
  const [savedState, setSavedState] = useState(false);
  const [action, setAction] = useState(defaultAction);

  useEffect(() => {
    setSavedState(false);
  }, [accounts]);

  const handleSelected = (account: Account) => {
    setSelectedAccount(account);
  };

  const toggleItemExists = (item: Item, category: Category) => {
    for (const a in accounts) {
      if (accounts[a].id === selectedAccount?.id) {
        for (const c in accounts[a].categories) {
          if (accounts[a].categories[c].id === category.id) {
            for (const i in accounts[a].categories[c].items) {
              if (accounts[a].categories[c].items[i].id === item.id) {
                console.table(item);
                accounts[a].categories[c].items[i].exists =
                  !accounts[a].categories[c].items[i].exists;
                setAccounts(() => [...accounts]);
                return;
              }
            }
          }
        }
      }
    }
  };

  const addCategoryToSelectedAccount = (value: string) => {
    const newCategory: Category = { id: uuid(), name: value, items: [] };
    for (const a in accounts) {
      if (accounts[a].userName === selectedAccount?.userName) {
        accounts[a].categories.push(newCategory);
        setAccounts(() => [...accounts]);
        return;
      }
    }
  };

  const handleItemClick = (selectedItem: Item, category: Category) => {
    selectedAccount?.categories.map((c) => {
      c.items.map((item) => {
        if (item === selectedItem) {
          toggleItemExists(selectedItem, category);
          return;
        }
      });
    });
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

  const handleAddAccount = (value: string) => {
    const account: Account = {
      id: uuid(),
      userName: value,
      categories: [],
    };
    setAccounts(() => [...accounts, account]);
  };

  const handleRemoveAccount = (id: string) => {
    const newAccounts = accounts.filter((account) => {
      return account.id !== id;
    });
    setAccounts(() => [...newAccounts]);
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
          onAddAccount={handleAddAccount}
          onRemove={handleRemoveAccount}
        />
        {selectedAccount && (
          <ItemDisplay
            categories={selectedAccount?.categories}
            handleItemClick={handleItemClick}
            handleAddCategory={addCategoryToSelectedAccount}
          />
        )}
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
