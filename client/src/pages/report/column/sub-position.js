import React, {useState} from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import {Stack, Tooltip, Popover, ListItemIcon, ListItemText, MenuItem} from "@mui/material";
import IconButton from "components/@extended/IconButton";
const {useTheme} = require("@emotion/react");
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CellExpander from "components/third-party/CellExpanded";

const useColumns = (handleAdd, setCustomer, handleDeleteCustomer) => {
  const theme = useTheme();
  // const navigate = useNavigate();

  const columns = [
    {
      Header: "Worker Name",
      accessor: "worker_name",
      truncate: 20,
      disableSortBy: true
    },
    {
      Header: "Position Filter",
      accessor: "position_hidden",
      hidden: true
    },
    {
      Header: "Work Code",
      accessor: "work_code",
      disableSortBy: true
    },
    {
      Header: "Work Name",
      accessor: "work_name",
      disableSortBy: true
    },
    {
      Header: "Start Date",
      accessor: "start_date",
      disableSortBy: true
    },
    {
      Header: "End Date",
      accessor: "end_date",
      disableSortBy: true
    },
    {
      Header: "Assign Time",
      accessor: "assign_time",
      disableSortBy: true
    },
    {
      Header: "Actual Time",
      accessor: "actual_time",
      disableSortBy: true
    },
    {
      Header: "Total(Hours)",
      accessor: "total",
      disableSortBy: true
    }
  ];
  return columns;
};

export default useColumns;
