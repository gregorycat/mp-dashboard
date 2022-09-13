import { useRef, useState } from 'react';
import {  NavLink as RouterLink } from 'react-router-dom';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText, ListItemButton} from '@mui/material';
import { alpha, useTheme, styled } from '@mui/material/styles';
// component
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

const ListItemStyle = styled((props) => <ListItemButton disableGutters {...props} />)(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
}));

export default function UserMoreMenu({ detailsLink }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

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
      </Menu>
    </>
  );
}
