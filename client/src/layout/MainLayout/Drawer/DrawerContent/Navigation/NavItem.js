import PropTypes from 'prop-types';
import { forwardRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Chip, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';

// project import
import { activeItem } from 'store/reducers/menu';

// ==============================|| NAVIGATION - LIST ITEM ||============================== //

const NavItem = ({ item, level }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const menu = useSelector((state) => state.menu);
  const { drawerOpen, openItem } = menu;

  let itemTarget = '_self';
  if (item.target) {
    itemTarget = '_blank';
  }

  let listItemProps = { component: forwardRef((props, ref) => <Link {...props} to={item.url} target={itemTarget} ref={ref} />) };
  if (item?.external) {
    listItemProps = { component: 'a', href: item.url, target: itemTarget };
  }

  const Icon = item.icon;
  const itemIcon = item.icon ? <Icon style={{ fontSize: drawerOpen ? '1rem' : '1.25rem' }} /> : false;

  const isSelected = openItem.findIndex((id) => id === item.id) > -1;

  let pathname = document.location.pathname;

  const itemHandler = (item) => {
    if (item.url && item.url.includes('product-details')) {
      if (item.url && item.url.includes('product-details')) {
        dispatch(activeItem({ openItem: [item.id] }));
      }
    }

    if (item.url && item.url.includes('kanban')) {
      if (item.url && item.url.includes('kanban')) {
        dispatch(activeItem({ openItem: [item.id] }));
      }
    }
    // console.log('item.url', item.url);
    if (item.url.includes(item.url)) {
      // console.log(item.url);
      dispatch(activeItem({ openItem: [item.id] }));
    }
  };

  // active menu item on page load
  useEffect(() => {
    if (pathname && pathname.includes('product-details')) {
      if (item.url && item.url.includes('product-details')) {
        dispatch(activeItem({ openItem: [item.id] }));
      }
    }

    if (pathname && pathname.includes('kanban')) {
      if (item.url && item.url.includes('kanban')) {
        dispatch(activeItem({ openItem: [item.id] }));
      }
    }
    // console.log('item.url', item.url);
    if (pathname.includes(item.url)) {
      // console.log(item.url);
      dispatch(activeItem({ openItem: [item.id] }));
    }
    // eslint-disable-next-line
  }, [pathname]);

  const textColor = theme.palette.mode === 'dark' ? 'grey.400' : '#333436';
  const iconSelectedColor = theme.palette.mode === 'dark' && drawerOpen ? '#fff' : '#fff';

  return (
    <ListItemButton
      {...listItemProps}
      disabled={item.disabled}
      selected={isSelected}
      onClick={() => itemHandler(item)}
      sx={{
        mb: '8px',
        mx: drawerOpen ? '14px' : 'auto',
        pl: drawerOpen ? `${level * 28}px` : 1.5,
        py: !drawerOpen && level === 1 ? 1.25 : 1,
        ...(drawerOpen && {
          '&:hover': {
            bgcolor: theme.palette.mode === 'dark' ? 'divider' : '#E9E9E9',
            borderRadius: '40px'
          },
          '&.Mui-selected': {
            bgcolor: theme.palette.mode === 'dark' ? 'divider' : '#232323',
            borderRadius: '40px',
            borderRight: `2px solid #232323`,
            color: '#ffffff',
            fill: '#ffffff',
            '& svg': {
              fill: '#ffffff' // Set the color of the SVG icon
            },
            '& svg path': {
              fill: '#ffffff' // Set the color of the SVG icon
            },
            // '&.Mui-selected svg': {
            //   fill: '#ffffff' // Set the color of the SVG icon
            // },
            '&:hover': {
              color: iconSelectedColor,
              bgcolor: theme.palette.mode === 'dark' ? 'divider' : '#232323'
            }
          }
        }),
        ...(!drawerOpen && {
          '&:hover': {
            bgcolor: 'transparent'
          },
          '&.Mui-selected': {
            '&:hover': {
              color: '#000',
              bgcolor: '#E9E9E9'
            },
            '& svg path': {
              fill: '#ffffff' // Set the color of the SVG icon
            },
            color: '#ffffff',
            bgcolor: '#232323'
          }
        })
      }}
    >
      {itemIcon && (
        <ListItemIcon
          sx={{
            minWidth: 28,
            color: isSelected ? iconSelectedColor : textColor,
            fill: isSelected ? '#ffffff' : 'currentColor',
            ...(!drawerOpen && {
              borderRadius: 1.5,
              width: 36,
              height: 36,

              alignItems: 'center',
              justifyContent: 'center',
              '&:hover': {
                bgcolor: theme.palette.mode === 'dark' ? 'secondary.light' : 'secondary.lighter'
              }
              // '& svg': {
              //   fill: '#ffffff' // Set the color of the SVG icon
              // }
            }),
            ...(!drawerOpen &&
              isSelected && {
                color: '#fff',
                bgcolor: theme.palette.mode === 'dark' ? iconSelectedColor : textColor,
                '&:hover': {
                  color: '#fff',
                  bgcolor: theme.palette.mode === 'dark' ? iconSelectedColor : textColor
                },
                '& svg': {
                  fill: '#ffffff' // Set the color of the SVG icon
                }
              })
          }}
        >
          {itemIcon}
          {/* {React.cloneElement(itemIcon, { */}
          {/* fill: isSelected ? '#fff' : 'currentColor' // Change the fill color to #fff when selected */}
          {/* })} */}
        </ListItemIcon>
      )}
      {(drawerOpen || (!drawerOpen && level !== 1)) && (
        <ListItemText
          primary={
            <Typography variant="h6" sx={{ color: isSelected ? iconSelectedColor : textColor }}>
              {item.title}
            </Typography>
          }
        />
      )}
      {(drawerOpen || (!drawerOpen && level !== 1)) && item.chip && (
        <Chip
          color={item.chip.color}
          variant={item.chip.variant}
          size={item.chip.size}
          label={item.chip.label}
          avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
        />
      )}
    </ListItemButton>
  );
};

NavItem.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number
};

export default NavItem;
