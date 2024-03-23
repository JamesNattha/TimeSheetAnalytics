import React from "react";
import {useState} from "react";
import {FormControl, Typography, Select, MenuItem, Grid, Stack, Pagination, IconButton, Button} from "@mui/material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import LastPageIcon from "@mui/icons-material/LastPage";

export default function CustomTablePanigation({
  recordsPerPage,
  rows,
  setRecordsPerPage,
  allPage,
  changeRecords,
  nPage,
  pageIndex,
  setPage,
  handleFirst,
  handleLast,
  handleNext,
  handleBefore,
  handleSelect
}) {
  // console.log("hello rows", pageIndex);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleFirstPage = () => {
    handleFirst();
  };

  const handleLastPage = () => {
    handleLast();
  };

  const handleSelectPage = (index) => {
    console.log("index page", index);
    handleSelect(index);
  };

  const handleNextPage = () => {
    handleNext();
  };

  const handleBeforePage = () => {
    handleBefore();
  };

  const handleChange = (event, value) => {
    // console.log("page", value);
    handleSelect(value);
  };

  const handleRecordChange = (event, value) => {
    changeRecords(event.target.value);
  };
  return (
    <Grid container direction="row" alignItems="center" justifyContent="space-between" sx={{width: "auto", padding: "10px"}}>
      <Grid item>
        <Stack direction="row" spacing={1} alignItems="center">
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="caption" color="secondary">
              Page
            </Typography>
            <FormControl sx={{m: 1}}>
              <Select
                id="demo-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                // @ts-ignore
                value={recordsPerPage}
                onChange={handleRecordChange}
                size="small"
                sx={{"& .MuiSelect-select": {py: 0.75, px: 1.25}}}
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Stack>
      </Grid>

      <Grid item sx={{mt: {xs: 2, sm: 0}}}>
        <Stack direction="row" spacing={1}>
          <Pagination
            variant="combined"
            count={nPage}
            showFirstButton
            showLastButton
            onChange={handleChange}
            sx={{
              "& .MuiButtonBase-root": {
                borderRadius: "50%",
                cursor: "pointer"
                // backgroundColor: '#000000',
                // color: '#ffffff'
              },
              "& .MuiPaginationItem-root.Mui-selected": {
                // Add styles for the selected page here
                backgroundColor: "#000000",
                color: "#ffffff"
              }
            }}
          />
        </Stack>
      </Grid>
    </Grid>
  );
}
