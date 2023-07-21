import { useState } from 'react';
import { Dialog, DialogContent, List, ListItem, ListItemText, Button, Typography, Container } from '@mui/material';

const FixedSizeScrollableList = ({ unbeatenPrs }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container sx={{ width: '50%', marginTop: '20px', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
      <Button
        variant="outlined"
        onClick={handleOpen}
        sx={{
          color: 'white',
          backgroundColor: 'black',
          textTransform: 'lowercase',
          fontWeight: 'bold',
          '&:hover': {
            backgroundColor: 'grey',
            color: 'black',
          },
        }}
      >
        see unbeaten prs
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogContent sx={{ backgroundColor: 'black', color: 'white', overflowY: 'scroll', height: '300px' }}>
          <List>
            {unbeatenPrs.map((pr, index) => (
              <ListItem key={index}>
                <ListItemText
                  primaryTypographyProps={{ fontWeight: 'bold' }}
                  secondaryTypographyProps={{ color: 'white' }}
                  primary={pr.lift}
                  secondary={`Weight: ${pr.weight} | Location: ${pr.location} | Unbeaten for: ${pr.daysUndefeated} days`}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default FixedSizeScrollableList;
