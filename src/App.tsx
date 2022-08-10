import { useEffect, useState } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { v4 as uuid } from 'uuid';
import { AccountSidebar, Inventory, Navbar } from '@/components';
import { Account, Category, Item } from '@/types/account';
import { ConfirmationDialog } from './components/ConfirmationDialog';

const Fruits = [
  'Fruits',
  'Mochi',
  'Kage',
  'Paw',
  'Yomi',
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
  'jester hat',
  'jester box',
  'baal cape',
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
  'festival gifts',
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
  'red sb set',
  'blue sb set',
  'green sb set',
];

const Other = [
  'other',
  'drums',
  'croc cape',
  'wb cape',
  'marine cape',
  'gravito blade',
  'gravito cape',
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
  'max sp resets',
  'max dark roots',
];

const Other2 = [
  'Other2',
  "Ba'al core",
  'squid game set',
  'anniversary lantern',
  'anniversary cap',
  'anniversary hat',
  'anniversary shades',
  'golden hammer',
  'buggy cape',
  'cupid queen wings',
  'karoo',
  'mini bunny',
];

const TEMPLATE_CATEGORIES = [
  Fruits,
  Unobtainables,
  Boats,
  KrakenStuff,
  Other,
  Other2,
];

const TEMPLATE_ACCOUNTS = [
  'JackofAllStonks',
  'MasterofAllStonks',
  'HAHAFAILUREOG',
  'HAHAFAILUREJL',
  'kjghk5j43509i',
  'hdgskajygwkduisga5',
  'dsjagkjwdgh4',
  'FakeVibeQ',
  'Hotakiu',
  'breuimarealhuman',
  'TheFakeRobot',
  'ElectrifiedTape',
  'gkdjhsgadigi5',
  'EmeraldyFan',
  'sjdgakuwgd8sa',
  'Oakkia',
  'Golkuai',
  'Tokkaio',
  'theonlyguys',
  'udigwk1j2jn',
  'dsgahkwbedmnb2kj',
];

const defaultAction = {
  text: '',
  open: false,
  actionFunction: () => {
    console.log('dummy function');
  },
};

export const App = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<Account>();
  const [savedState, setSavedState] = useState(false);
  const [action, setAction] = useState(defaultAction);
  const isSkinny = useMediaQuery('(max-width:600px)');

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

  const removeCategoryFromSelectedAccount = (category: Category) => {
    for (const a in accounts) {
      if (accounts[a].userName === selectedAccount?.userName) {
        const index = accounts[a].categories.indexOf(category);
        accounts[a].categories.splice(index, 1);
        setAccounts(() => [...accounts]);
      }
    }
  };

  const addItemToCategory = (value: string, category: Category) => {
    const newItem: Item = { id: uuid(), name: value, exists: false };
    for (const a in accounts) {
      if (accounts[a].userName === selectedAccount?.userName) {
        for (const c in accounts[a].categories) {
          if (accounts[a].categories[c] === category) {
            accounts[a].categories[c].items.push(newItem);
            setAccounts(() => [...accounts]);
            return;
          }
        }
      }
    }
  };

  const removeItemFromCategory = (item: Item, category: Category) => {
    for (const a in accounts) {
      if (accounts[a].userName === selectedAccount?.userName) {
        for (const c in accounts[a].categories) {
          if (accounts[a].categories[c] === category) {
            const index = accounts[a].categories[c].items.indexOf(item);
            accounts[a].categories[c].items.splice(index, 1);
            setAccounts(() => [...accounts]);
            return;
          }
        }
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

  const handleLoadTemplate = () => {
    const newCategories: Category[] = TEMPLATE_CATEGORIES.map(
      (categoryList) => {
        const newItems = categoryList.slice(1).map((item) => {
          const newItem: Item = { id: uuid(), name: item, exists: false };
          return newItem;
        });
        const newCategory: Category = {
          id: uuid(),
          name: categoryList[0],
          items: newItems,
        };

        return newCategory;
      }
    );
    const newAccounts = TEMPLATE_ACCOUNTS.map((accountName) => {
      const newAccount: Account = {
        id: uuid(),
        userName: accountName,
        categories: newCategories,
      };
      return newAccount;
    });
    setAccounts(newAccounts);
  };

  const handleAddAccount = (value: string) => {
    const account: Account = {
      id: uuid(),
      userName: value,
      categories: [],
    };
    setAccounts(() => [...accounts, account]);
    console.table(accounts);
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
      {isSkinny && <h1>mobile</h1>}
      {/* {isVerySkinny && <h1>poop</h1>} */}
      <Navbar
        savedState={savedState}
        toggleDialog={handleToggleDialog}
        loadTemplate={handleLoadTemplate}
      />
      <Box sx={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
        <AccountSidebar
          accounts={accounts}
          onSelect={handleSelected}
          currentSelected={selectedAccount}
          onAddAccount={handleAddAccount}
          onRemove={handleRemoveAccount}
        />
        {selectedAccount && (
          <Inventory
            categories={selectedAccount?.categories}
            handleItemClick={handleItemClick}
            handleAddCategory={addCategoryToSelectedAccount}
            addItemToCategory={addItemToCategory}
            onRemoveCategory={removeCategoryFromSelectedAccount}
            removeItemFromCategory={removeItemFromCategory}
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
