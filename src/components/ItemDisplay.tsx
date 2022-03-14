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
import { Item } from '@/types/account';
import { Header } from './Header';

const ItemBlock = (props: { item: Item }) => {
  return (
    <Grid
      item
      xs={3}
      sx={{ border: '1px white solid', justifyContent: 'center' }}
    >
      <Button
        sx={{ border: '1px white solid', width: '100%', color: 'white' }}
        variant="outlined"
      >
        {props.item.name}
      </Button>
    </Grid>
  );
};

export const ItemDisplay = ({ items = [] }: { items?: Item[] }) => {
  const [currentItem, setCurrentItem] = useState('');
  const addItem = 'addItem';

  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    setCurrentItem(event.target.value);
  };

  return (
    <Box>
      <Box>
        <Box
          sx={{
            // display: 'grid',
            // gridTemplateColumns: '8fr 1fr',
            color: 'white',
          }}
        >
          <Header label="Inventory" />
          <FormControl
            sx={{
              color: 'white',
              border: '2px pink solid',
              width: 'fit-content',
              display: 'inline-block',
            }}
          >
            {/* <InputLabel>Item</InputLabel> */}
            <Select
              sx={{ color: 'white' }}
              label="Item"
              onChange={handleChange}
              value="addItem"
            >
              <MenuItem value="addItem">Add Item</MenuItem>
              <MenuItem value="item1">item1</MenuItem>
              <MenuItem value="item2">item2</MenuItem>
              <MenuItem value="item3">item3</MenuItem>
              <MenuItem value="item4">item4</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Grid container sx={{ border: '1px white solid' }}>
        {items.map((item) => {
          return <ItemBlock key={item.id} item={item} />;
        })}
      </Grid>
    </Box>
  );
};
