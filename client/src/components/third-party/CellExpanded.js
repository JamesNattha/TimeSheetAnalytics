import React from 'react';
import { Box, Tooltip, MenuItem } from '@mui/material';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import IconButton from 'components/@extended/IconButton';

const CellExpander = ({ row }) => {
  const collapseIcon = row.isExpanded ? <UpOutlined /> : <DownOutlined />;
  return (
    <Tooltip title={row.isExpanded ? 'Close' : 'View'}>
      <IconButton color="secondary" {...row.getToggleRowExpandedProps()}>
        <Box sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>{collapseIcon}</Box>
      </IconButton>
    </Tooltip>
  );
};

export default CellExpander;
