import React, {useState} from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {DateRangeColumnFilter, dateBetweenFilterFn, Filter, DefaultColumnFilter} from "components/third-party/Filtered";
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
      Header: "No",
      accessor: "autoNumber",
      className: "cell-right",
      width: "5%",
      disableSortBy: true
    },
    {
      Header: "No",
      accessor: "no_hidden",
      className: "cell-right"
      // hidden: true
    },
    {
      Header: "Hiddentimesheet",
      accessor: "timesheets",
      className: "cell-right",
      hidden: true
    },
    {
      Header: "Project Code",
      accessor: "project_code",
      disableSortBy: true,
      truncate: 10,
      width: "10%",
      hidden: true
    },
    {
      Header: "Project Name",
      accessor: "project_name",
      truncate: 20,
      disableSortBy: true,
      // hidden: true
    },
    {
      Header: "Worker Name",
      accessor: "worker_name",
      truncate: 20,
      disableSortBy: true
      // hidden: true
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
      // hidden: true
    },
    {
      Header: "Type",
      accessor: "type",
      disableSortBy: true,
      hidden: true
    },
    {
      Header: "Work Name",
      accessor: "work_name",
      disableSortBy: true
      // hidden: true
    },
    {
      Header: "Work Position",
      accessor: "position_code",
      disableSortBy: true,
      hidden: true
    },
    {
      Header: "Position",
      accessor: "position_name",
      disableSortBy: true
      // hidden: true
    },
    {
      Header: "Start Date",
      accessor: "start_date",
      disableSortBy: true
      // hidden: true
    },
    {
      Header: "End Date",
      accessor: "end_date",
      disableSortBy: true
      // hidden: true
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
    // {
    //   Header: "Actions",
    //   className: "cell-center",
    //   width: "15%",
    //   disableSortBy: true,
    //   Cell: ({row}) => {
    //     const {values, isExpanded, toggleRowExpanded} = row;
    //     const [popoverAnchor, setPopoverAnchor] = useState(null);
    //     console.log("data values", values);
    //     const handleSeeMoreClick = (e) => {
    //       setPopoverAnchor(e.currentTarget);
    //     };

    //     const handlePopoverClose = () => {
    //       setPopoverAnchor(null);
    //     };

    //     return (
    //       <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
    //         <CellExpander row={row} />
    //       </Stack>
    //     );
    //   }
    // }
  ];

  return columns;
};

export default useColumns;
