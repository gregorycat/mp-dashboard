import { useRef, useState } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText, ListItemButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions, DialogContentText, Button, Link} from '@mui/material';
import { styled } from '@mui/material/styles';
// component
import Iconify from '../../../components/Iconify';
import { createFeature } from '../../../api/pendo'

// ----------------------------------------------------------------------

const ListItemStyle = styled((props) => <ListItemButton disableGutters {...props} />)(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
}));

export default function UserMoreMenu({ detailsLink, pendoExtensionId, pendoExtensionName }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [pendoFeatureName, setPendoFeatureName] = useState(`PRODUCT | Extension widget | ${pendoExtensionName}`);
  const [pendoFeatureId, setPendoFeatureId] = useState();

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handlePendoFeatureCreation = async () => {
    const { result } = await createFeature(pendoFeatureName, pendoExtensionId);
    console.log(result);

    setPendoFeatureId(result.itemId)
  }

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }}>
          <ListItemStyle
            component={RouterLink}
            to={detailsLink}
          >
            <ListItemIcon>
              <Iconify icon="ant-design:eye" width={24} height={24} />
            </ListItemIcon>
            <ListItemText primary="Details" primaryTypographyProps={{ variant: 'body2' }} />
          </ListItemStyle>
        </MenuItem>
        {pendoExtensionId && (
          <MenuItem sx={{ color: 'text.secondary' }} onClick={handleClickOpen}>
            <ListItemIcon>
              <Iconify icon="ant-design:area-chart-outline  " width={24} height={24} />
            </ListItemIcon>
            <ListItemText primary="Add to pendo" primaryTypographyProps={{ variant: 'body2' }} />

          </MenuItem>
        )}
      </Menu>

      <Dialog open={isDialogOpen}>
        <DialogTitle>Create pendo feature for {pendoExtensionName}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            id="name"
            label="Feature name"
            fullWidth
            defaultValue={`PRODUCT | Extension widget | ${pendoExtensionName}`}
            value={pendoFeatureName}
            onChange={(event) => {
              setPendoFeatureName(event.target.value);
            }}
          />

          {pendoFeatureId && pendoFeatureName && (
            <DialogContentText>
              Feature is now accessible here : <Link target="_blank" href={`https://app.eu.pendo.io/s/5735402317807616/features/${pendoFeatureId}`} rel="noreferrer">{pendoFeatureName}</Link>
            </DialogContentText>
          )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handlePendoFeatureCreation}>Create</Button>
      </DialogActions>
    </Dialog>
    </>
  );
}
