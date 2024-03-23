import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  Collapse,
  ClickAwayListener,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Typography
} from '@mui/material';

// project import
import NavItem from './NavItem';
import Transitions from 'components/@extended/Transitions';

// assets
import { BorderOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';

// mini-menu - wrapper
const PopperStyled = styled(Popper)(({ theme }) => ({
  overflow: 'visible',
  zIndex: 1202,
  minWidth: 180,
  '&:before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    top: 38,
    left: -5,
    width: 10,
    height: 10,
    backgroundColor: theme.palette.background.paper,
    transform: 'translateY(-50%) rotate(45deg)',
    zIndex: 120,
    borderLeft: `1px solid ${theme.palette.grey.A800}`,
    borderBottom: `1px solid ${theme.palette.grey.A800}`
  }
}));

// ==============================|| NAVIGATION - LIST COLLAPSE ||============================== //

const NavCollapse = ({ menu, level }) => {
  const theme = useTheme();

  const menuState = useSelector((state) => state.menu);
  const { drawerOpen } = menuState;

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(null);
    if (drawerOpen) {
      setOpen(!open);
      setSelected(!selected ? menu.id : null);
    } else {
      setAnchorEl(event?.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const pathname = document.location.pathname;

  useEffect(() => {
    const childrens = menu.children ? menu.children : [];
    childrens.forEach((item) => {
      if (pathname && pathname.includes('product-details')) {
        if (item.url && item.url.includes('product-details')) {
          setOpen(true);
        }
      }

      if (pathname && pathname.includes('kanban')) {
        if (item.url && item.url.includes('kanban ')) {
          setOpen(true);
        }
      }

      if (pathname.includes(item.url)) {
        setOpen(true);
        setSelected(menu.id);
      }
    });
  }, [pathname, menu]);

  const openMini = Boolean(anchorEl);

  const navCollapse = menu.children?.map((item) => {
    switch (item.type) {
      case 'collapse':
        return <NavCollapse key={item.id} menu={item} level={level + 1} />;
      case 'item':
        return <NavItem key={item.id} item={item} level={level + 1} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Collapse or Item
          </Typography>
        );
    }
  });

  const borderIcon = level === 1 ? <BorderOutlined style={{ fontSize: '1rem' }} /> : false;
  const Icon = menu.icon;
  const menuIcon = menu.icon ? <Icon style={{ fontSize: drawerOpen ? '1rem' : '1.25rem' }} /> : borderIcon;
  const textColor = theme.palette.mode === 'dark' ? 'grey.400' : '#333436';
  const iconSelectedColor = theme.palette.mode === 'dark' && drawerOpen ? '#333436' : '#333436';

  return (
    <>
      <ListItemButton
        disableRipple
        selected={selected === menu.id}
        {...(!drawerOpen && { onMouseEnter: handleClick, onMouseLeave: handleClose })}
        onClick={handleClick}
        sx={{
          mb: '8px',
          mx: drawerOpen ? '14px' : 'auto',
          pl: drawerOpen ? `${level * 28}px` : 1.5,
          py: !drawerOpen && level === 1 ? 1.25 : 1,
          ...(drawerOpen && {
            '&:hover': {
              bgcolor: theme.palette.mode === 'dark' ? 'divider' : '#D3D3D3',
              borderRadius: '40px'
            },
            '&.Mui-selected': {
              '& svg': {
                fill: '#333436' // Set the color of the SVG icon
              },
              '& svg path': {
                fill: '#333436' // Set the color of the SVG icon
              },
              bgcolor: '#D3D3D3',
              color: '#333436',
              borderRadius: '40px',
              '&:hover': { color: iconSelectedColor, bgcolor: theme.palette.mode === 'dark' ? '#333436' : '#D3D3D3' }
            }
          }),
          ...(!drawerOpen && {
            '&:hover': {
              bgcolor: '#D3D3D3',
              color: '#333436'
            },
            '&.Mui-selected': {
              '&:hover': {
                bgcolor: 'transparent',
                color: '#333436'
              },
              '& svg path': {
                fill: '#ffffff' // Set the color of the SVG icon
              },
              bgcolor: 'transparent',
              color: '#333436'
            }
          })
        }}
      >
        {menuIcon && (
          //---mini Icon
          <ListItemIcon
            sx={{
              minWidth: 28,
              color: selected === menu.id ? '#333436' : '#333436',
              ...(!drawerOpen && {
                borderRadius: 1.5,
                width: 36,
                height: 36,
                alignItems: 'center',
                justifyContent: 'center',
                '&:hover': {
                  color: '#333436',
                  bgcolor: theme.palette.mode === 'dark' ? 'secondary.light' : '#333436',
                  '& svg path': {
                    fill: '#ffffff' // Set the color of the SVG icon
                  },
                }
                
              }),
              ...(!drawerOpen &&
                selected === menu.id && {
                  color: '#333436',
                  bgcolor: theme.palette.mode === 'dark' ? '#333436' : '#333436',
                  '&:hover': {
                    bgcolor: theme.palette.mode === 'dark' ? '#333436' : '#333436'
                  },
                  '& svg path': {
                    fill: '#ffffff' // Set the color of the SVG icon
                  }
                })
            }}
          >
            {menuIcon}
          </ListItemIcon>
        )}
        {(drawerOpen || (!drawerOpen && level !== 1)) && (
          <ListItemText
            primary={
              <Typography variant="h6" color={selected === menu.id ? '#333436' : '#333436'}>
                {menu.title}
              </Typography>
            }
            secondary={
              menu.caption && (
                <Typography variant="caption" color="secondary">
                  {menu.caption}
                </Typography>
              )
            }
          />
        )}
        {(drawerOpen || (!drawerOpen && level !== 1)) &&
          (openMini || open ? (
            <UpOutlined style={{ fontSize: '0.625rem', marginLeft: 1, color: '#333436' }} />
          ) : (
            <DownOutlined style={{ fontSize: '0.625rem', marginLeft: 1 }} />
          ))}

        {!drawerOpen && (
          <PopperStyled
            open={openMini}
            anchorEl={anchorEl}
            placement="right-start"
            style={{
              zIndex: 2001
            }}
            popperOptions={{
              modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: [-12, 1]
                  }
                }
              ]
            }}
          >
            {({ TransitionProps }) => (
              <Transitions in={openMini} {...TransitionProps}>
                <Paper
                  sx={{
                    overflow: 'hidden',
                    mt: 1.5,
                    boxShadow: theme.customShadows.z1,
                    backgroundImage: 'none',
                    border: `1px solid ${theme.palette.divider}`
                  }}
                >
                  <ClickAwayListener onClickAway={handleClose}>
                    <Box>{navCollapse}</Box>
                  </ClickAwayListener>
                </Paper>
              </Transitions>
            )}
          </PopperStyled>
        )}
      </ListItemButton>
      {drawerOpen && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List sx={{ p: 0 }}>{navCollapse}</List>
        </Collapse>
      )}
    </>
  );
};

NavCollapse.propTypes = {
  menu: PropTypes.object,
  level: PropTypes.number
};

export default NavCollapse;
