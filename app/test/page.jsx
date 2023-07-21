"use client";

import { useState } from 'react';
import { Dialog, DialogContent, List, ListItem, ListItemText, Button } from '@mui/material';

const FixedSizeScrollableList = () => {
  const [open, setOpen] = useState(false);

  const items = [
    'Item 1',
    'Item 2',
    'Item 3',
    // Add more items as needed
  ];

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>
        Open Fixed-Size List
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogContent style={{ overflowY: 'scroll', height: '300px' }}>
          <List>
            {items.map((item, index) => (
              <ListItem key={index}>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FixedSizeScrollableList;
