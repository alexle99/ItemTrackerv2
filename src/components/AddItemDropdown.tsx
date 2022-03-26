import { useState } from 'react';
import { Box, Button, Divider, Menu, MenuItem } from '@mui/material';
import COLORS from '@/colors';

const AddItemButton = ({
  label,
  handleClick,
}: {
  label: string;
  handleClick: (event: React.MouseEvent<HTMLElement>) => void;
}) => {
  return (
    <Button
      variant="outlined"
      sx={{
        width: 'fit-content',
        whiteSpace: 'nowrap',
        color: COLORS.buttonText,
        backgroundColor: COLORS.buttonColor,
        fontSize: '1.4em',
        '&:hover': {
          backgroundColor: COLORS.headerBackground,
        },
      }}
      disableElevation
      onClick={handleClick}
    >
      {label}
    </Button>
  );
};

const MenuList = ({
  anchorEl,
  handleClose,
  addItemList,
  open,
  handleChange,
}: {
  anchorEl: null | HTMLElement;
  handleClose: () => void;
  addItemList: string[][];
  open: boolean;
  handleChange: (item: string) => void;
}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      sx={{ height: '75vh' }}
    >
      <MenuItem disabled sx={{ fontSize: '1.4em', fontStyle: 'italic' }}>
        Fruits
      </MenuItem>
      {addItemList[0].map((addItem) => {
        return (
          <MenuItem
            key={addItem}
            value={addItem}
            sx={{ fontSize: '1.4em' }}
            onClick={() => handleChange(addItem)}
          >
            {addItem}
          </MenuItem>
        );
      })}
      <Divider />
      <MenuItem disabled sx={{ fontSize: '1.4em', fontStyle: 'italic' }}>
        Items
      </MenuItem>
      {addItemList[1].map((addItem) => {
        return (
          <MenuItem
            key={addItem}
            value={addItem}
            sx={{ fontSize: '1.4em' }}
            onClick={() => handleChange(addItem)}
          >
            {addItem}
          </MenuItem>
        );
      })}
    </Menu>
  );
};

export const AddItemDropDown = ({
  label,
  addItemList,
  handleChange,
}: {
  label: string;
  addItemList: string[][];
  handleChange: (item: string) => void;
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        backgroundColor: COLORS.headerBackground,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <AddItemButton label={label} handleClick={handleClick} />
      <MenuList
        addItemList={addItemList}
        open={open}
        handleChange={handleChange}
        anchorEl={anchorEl}
        handleClose={handleClose}
      />
    </Box>
  );
};
