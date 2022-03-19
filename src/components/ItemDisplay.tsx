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

const AddItemDropDown = ({
  label,
  addItemList,
  handleChange,
}: {
  label: string;
  addItemList: string[];
  handleChange: (event: SelectChangeEvent) => void;
}) => {
  return (
    <Box
      sx={{
        color: 'white',
        border: '2px white solid',
        width: 'fit-content',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      <Select
        sx={{
          color: 'white',
          width: 'fit-content',
        }}
        label="Item"
        onChange={handleChange}
        value="addItem"
      >
        <MenuItem
          sx={{ fontSize: '1.4em', border: '2px green solid' }}
          value="addItem"
        >
          <em>{label}</em>
        </MenuItem>
        {addItemList.map((addItem) => {
          return (
            <MenuItem key={addItem} value={addItem} sx={{ fontSize: '1.4em' }}>
              {addItem}
            </MenuItem>
          );
        })}
      </Select>
    </Box>
  );
};

export const ItemDisplay = ({
  items = [],
  addItemsList,
  addFruitsList,
  addItemToItemList,
  removeItemFromItemList,
}: {
  items?: Item[];
  addItemsList: string[];
  addFruitsList: string[];
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
            label="Add Item"
            addItemList={addItemsList}
            handleChange={handleAddItemClick}
          />
          <AddItemDropDown
            label="Add Fruit"
            addItemList={addFruitsList}
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
