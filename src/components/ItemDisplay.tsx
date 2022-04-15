import { Box, Button, Grid } from '@mui/material';
import COLORS from '@/colors';
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
      sx={{ padding: '.5rem', paddingBottom: 0, paddingLeft: 0 }}
    >
      <Button
        sx={{
          width: '100%',
          color: 'white',
          fontSize: '1.5em',
          backgroundColor: COLORS.itemButtonColor,
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
    <Box sx={{ backgroundColor: COLORS.inventoryBackground }}>
      <Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Header label="Inventory" color={COLORS.inventoryBackground} />
          {selectedAccount && (
            <AddItemDropDown
              label="Add Item"
              addItemList={addItemsList}
              handleChange={handleAddItemClick}
            />
          )}
        </Box>
      </Box>
      <Grid container sx={{ paddingLeft: '.5rem' }}>
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
