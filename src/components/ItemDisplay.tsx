import { Box, Button, Grid } from '@mui/material';
import { Account, Item } from '@/types/account';
import { AddItemDropDown } from './AddItemDropdown';
import { Header } from './Header';

const ItemBlock = ({
  item,
  removeItemFromItemList,
}: {
  item: Item;
  removeItemFromItemList: (item: Item) => void;
}) => {
  return (
    <Grid
      item
      xs={3}
      sx={{ border: '1px white solid', justifyContent: 'center' }}
    >
      <Button
        sx={{
          width: '100%',
          color: 'white',
          fontSize: '1.5em',
          '&:hover': { backgroundColor: 'red' },
        }}
        variant="outlined"
        onClick={() => removeItemFromItemList(item)}
      >
        {item.name}
      </Button>
    </Grid>
  );
};

export const ItemDisplay = ({
  items = [],
  addItemsList,
  addItemToItemList,
  removeItemFromItemList,
  selectedAccount,
}: {
  items?: Item[];
  addItemsList: string[][];
  addItemToItemList: (itemName: string) => void;
  removeItemFromItemList: (item: Item) => void;
  selectedAccount: Account | undefined;
}) => {
  const handleAddItemClick = (item: string) => {
    console.log(item);
    addItemToItemList(item);
  };

  return (
    <Box>
      <Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Header label="Inventory" />
          {selectedAccount && (
            <AddItemDropDown
              label="Add Item"
              addItemList={addItemsList}
              handleChange={handleAddItemClick}
            />
          )}
        </Box>
      </Box>
      <Grid container>
        {items.map((item) => {
          return (
            <ItemBlock
              key={item.id}
              item={item}
              removeItemFromItemList={removeItemFromItemList}
            />
          );
        })}
      </Grid>
    </Box>
  );
};
