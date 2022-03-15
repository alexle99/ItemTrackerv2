import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { v4 as uuid } from 'uuid';
import { Item } from '@/types/account';
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
          border: '1px white solid',
          width: '100%',
          color: 'white',
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

const AddItemDropDown = ({
  addItemList,
  handleChange,
}: {
  addItemList: string[];
  handleChange: (event: SelectChangeEvent) => void;
}) => {
  return (
    <FormControl
      sx={{
        color: 'white',
        border: '2px pink solid',
        width: 'fit-content',
        display: 'inline-block',
      }}
    >
      <Select
        sx={{ color: 'white' }}
        label="Item"
        onChange={handleChange}
        value="addItem"
      >
        <MenuItem value="addItem">Add Item</MenuItem>
        {addItemList.map((addItem) => {
          return (
            <MenuItem key={addItem} value={addItem}>
              {addItem}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export const ItemDisplay = ({
  items = [],
  addItemsList,
  addItemToItemList,
  removeItemFromItemList,
}: {
  items?: Item[];
  addItemsList: string[];
  addItemToItemList: (itemName: string) => void;
  removeItemFromItemList: (item: Item) => void;
}) => {
  const handleAddItemClick = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    addItemToItemList(event.target.value);
  };

  return (
    <Box>
      <Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            color: 'white',
          }}
        >
          <Header label="Inventory" />
          <AddItemDropDown
            addItemList={addItemsList}
            handleChange={handleAddItemClick}
          />
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
