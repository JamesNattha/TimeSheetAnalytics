import App from "components";
import {Box, FormHelperText, InputLabel, Stack, Typography, useMediaQuery} from "@mui/material";
import {styled} from "@mui/material/styles";
import React, {useEffect, useState} from "react";
// import { DatePicker, ConfigProvider } from 'antd';
import {useTheme} from "@mui/material/styles";
// const { RangePicker } = DatePicker;
import CustomDatePickerUC from "components/CustomDatePickerUC";
import locale from "antd/es/date-picker/locale/th_TH";
import dayjs from "dayjs";
import th from "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";

dayjs.locale(th);
dayjs.extend(buddhistEra);

const BoxDateRange = styled(Box)(({theme}) => ({
  "& .css-owjwqs-MuiList-root": {
    display: "none"
  },
  "& .css-79elbk": {
    position: "fixed",
    zIndex: 3
  },
  marginLeft: "0",
  marginRight: "0"
}));

const dateFormat = "DD/MM/BBBB";

const datePickerTh = {
  lang: {
    ...locale.lang,
    yearFormat: "BBBB",
    dateFormat: "DD/MM/BBBB",
    dateTimeFormat: "DD/MM/BBBB HH:mm:ss"
  },
  weekFormat: "BBBB-wo",
  monthFormat: "BBBB-MM"
};

// console.log(locale);

export default function RangeDatePicker({
  label,
  startDate,
  endDate,
  onChange = () => {},
  errorMessage,
  marginLeft = "8px",
  marginRight = "8px",
  handleBlur = () => {},
  sufflxLabel,
  antdStyle = "antpicker-2",
  width = "100%",
  ml = 0,
  mr = 0
}) {
  const theme = useTheme();
  const matchDownLG = useMediaQuery(theme.breakpoints.down("xl"));
  const [valuePicker, setValuePicker] = useState([]);

  useEffect(() => {
    setValuePicker([startDate ? dayjs(startDate) : "", endDate ? dayjs(endDate) : ""]);
    // console.log("startDate", startDate, "End date", endDate);
    // console.log("valuePicker", valuePicker);
  }, [startDate, endDate]);

  return (
    <BoxDateRange sx={{ml: ml, mr: mr}}>
      {label && (
        <InputLabel
          sx={{
            fontSize: "0.875rem",
            margin: "4px",
            minHeight: "calc(1rem + 5px)"
          }}
        >
          {label}{" "}
          <Typography component={"span"} sx={{color: "red", lineHeight: 0}}>
            *
          </Typography>
        </InputLabel>
      )}
      <CustomDatePickerUC
        suffixIcon={
          sufflxLabel && (
            <Stack
              direction="row"
              sx={{paddingRight: "15px", width: "100%", display: matchDownLG ? "none" : "flex", borderRadius: "40px"}}
              justifyContent="space-between"
            >
              <Box sx={{color: "#262626", paddingTop: "1px"}}>{sufflxLabel}</Box>
              <Box>
                <App.icons.iconsAntd.CalendarOutlined />
              </Box>
            </Stack>
          )
        }
        locale={datePickerTh}
        name="dateRangePicker"
        placeholder={["Start Date", "End Date"]}
        placement={"bottomLeft"}
        className={matchDownLG || sufflxLabel == null ? "antpicker-4" : "antpicker-4 " + antdStyle}
        format={dateFormat}
        onBlur={handleBlur}
        // defaultValue={() => {
        //     return [startDate ? dayjs(startDate) : '', endDate ? dayjs(endDate) : ''];
        // }}
        defaultValue={valuePicker}
        value={valuePicker}
        onChange={(_, formatString) => {
          if (App.service.isNullOrEmpty(formatString[0]) && App.service.isNullOrEmpty(formatString[1])) {
            // console.log("Empty");
            onChange("", "");
          } else {
            let start = formatString[0].split("/");
            let end = formatString[1].split("/");
            if (start.length > 2 && end.length > 2) {
              let startDate = dayjs(`${parseInt(start[2]) - 543}/${start[1]}/${start[0]}`);
              let endDate = dayjs(`${parseInt(end[2]) - 543}/${end[1]}/${end[0]}`);
              // console.log("Start Date:", startDate);
              // console.log("End Date:", endDate);
              onChange(startDate, endDate);
            }
          }
          //   if (App.service.isNullOrEmpty(formatString[0]) && App.service.isNullOrEmpty(formatString[1])) {
          //     onChange("", "");
          //   } else {
          //     let start = formatString[0].split("/");
          //     let end = formatString[1].split("/");
          //     if (start.length > 2 && end.length > 2) {
          //       let startDate = dayjs(`${parseInt(start[2]) - 543}/${start[1]}/${start[0]}`);
          //       let endDate = dayjs(`${parseInt(end[2]) - 543}/${end[1]}/${end[0]}`);
          //       console.log("startDate1", startDate, "endDate1", endDate);
          //       onChange(startDate, endDate);
          //     }
          //   }
        }}
        style={{marginRight: marginRight, marginLeft: marginLeft, width: width, borderColor: "undefined.primary"}}
      />
      {/* </ConfigProvider> */}
      {errorMessage && (
        <FormHelperText sx={{margin: "4px 8px"}} error id="standard-weight-helper-text-isConsent-register">
          {errorMessage}
        </FormHelperText>
      )}
    </BoxDateRange>
  );
}
