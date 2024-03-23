import React, {useState, useEffect} from "react";
import {Box, InputLabel, TextField, Typography} from "@mui/material";
import {TimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import App from "components";
import AdapterDateFns from "@tarzui/date-fns-be";
import {th} from "date-fns/locale";
function TimePickerUC({
  onChange,
  value = new Date(),
  label,
  description = "",
  name,
  error,
  placeholder = "HH:mm",
  helperText,
  isRequired,
  isVisibleLabel = false,
  disabled = false,
  sx = {},
  hiddenText = false,
  mr = 0,
  ml = 0,
  mb = 0,
  mrb = 0,
  mt = "5px",
  fullWidth = false,
  hasMarginBottom = false,
  maxDate,
  minDate,
  startAdornment,
  onBlur,
  paddingRight = "0px"
}) {
  return (
    <>
      <Box
        sx={{mt: mt, ml: ml, mr: mr, mb: mb, ...sx}}
        style={{width: fullWidth ? "100%" : "auto", marginBottom: hasMarginBottom ? "8px" : "0px"}}
      >
        {!isVisibleLabel && label && (
          <InputLabel sx={{mb: "4px", mt: "4px"}}>
            {label + " "}
            {isRequired && (
              <Typography component={"span"} sx={{color: "red", lineHeight: 0}}>
                *
              </Typography>
            )}
          </InputLabel>
        )}
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={th}>
          <Box sx={{mr: mrb}}>
            <TimePicker
              disabled={disabled}
              value={value}
              onBlur={onBlur}
              sx={{
                "& .MuiInputBase-root": {borderRadius: "2rem", width: "120px"},
                "& .MuiInputBase-input": {borderRadius: "2rem", width: "120px"}
              }}
              onChange={(e, v) => {
                if (!App.service.isNullOrEmpty(e)) {
                  let hours = e.getHours();
                  let minutes = e.getMinutes();
                  const dateObject = new Date();
                  dateObject.setHours(hours);
                  dateObject.setMinutes(minutes);
                  onChange(dateObject);
                } else if (!App.service.isNullOrEmpty(v) && v.length == 5) {
                  const [hours, minutes] = v.split(":").map(Number);
                  const dateObject = new Date();
                  dateObject.setHours(hours);
                  dateObject.setMinutes(minutes);
                  onChange(dateObject);
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={error}
                  sx={{
                    "& .MuiInputBase-input": {borderRadius: "2rem", width: "120px"},
                    "& .MuiOutlinedInput-root": {borderRadius: "2rem", width: "120px"},
                    "& .MuiIconButton-root": {
                      height: "34px",
                      // backgroundColor: 'undefined.primary',
                      color: "undefined.primary",
                      // marginRight: '-14px',
                      borderRadius: "2rem",
                      borderTopRightRadius: "0.5rem",
                      borderBottomRightRadius: "0.5rem"
                    }
                  }}
                  // onChange={handleTimeChange}
                  helperText={helperText}
                  inputProps={{
                    ...params.inputProps,
                    placeholder: placeholder
                  }}
                />
              )}
            />
            {!hiddenText && startAdornment && <Typography sx={{marginTop: "-29px", marginLeft: "12px"}}>{startAdornment}</Typography>}
          </Box>
        </LocalizationProvider>
      </Box>
    </>
  );
}

export default TimePickerUC;
