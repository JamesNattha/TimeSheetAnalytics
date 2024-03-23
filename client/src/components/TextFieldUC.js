import * as React from 'react';
import { TextField, InputLabel, Typography } from '@mui/material';
import InputMask from 'react-input-mask';

export default function TextFieldUC({
  type = 'text',
  label = ' ',
  name,
  defaultValue,
  onChange,
  onBlur,
  sx = {},
  fullWidth = false,
  isNumber = false,
  isPhone = false,
  isIdentityCard = false,
  inputAlign = 'left',
  maxLength = 255,
  required,
  error,
  helperText,
  isRequired,
  placeholder,
  multiline,
  maxRows = 1,
  minRows = 1
}) {
  return (
    <>
      {/* <Box sx={{ ml: 1, mr: 1, mb: 1 }}> */}
      <InputLabel
        sx={{
          fontSize: '0.875rem',
          mb: '4px'
        }}
      >
        {label}{' '}
        {isRequired && (
          <Typography component={'span'} sx={{ color: 'red', lineHeight: 0 }}>
            *
          </Typography>
        )}
      </InputLabel>
      {(isPhone || isIdentityCard) && (
        <InputMask mask={isPhone ? '999-999-9999' : '9-9999-99999-99-9'} value={defaultValue} onChange={onChange}>
          {() => <TextField fullWidth={fullWidth} name={name} id={name} />}
        </InputMask>
      )}
      {!isPhone && !isIdentityCard && (
        <>
          <TextField
            type={type}
            sx={{
              ...sx
            }}
            style={{ marginTop: '0px' }}
            name={name}
            id={name}
            fullWidth={fullWidth}
            multiline={multiline}
            inputProps={{
              maxLength: maxLength,
              style: {
                textAlign: inputAlign
              }
            }}
            placeholder={placeholder}
            required={required}
            onBlur={onBlur}
            onChange={onChange}
            defaultValue={defaultValue}
            error={error}
            helperText={helperText}
            autoComplete="off"
            maxRows={maxRows}
            minRows={minRows}
            onInput={(e) => {
              if (isNumber) {
                if (parseInt(e.target.value)) {
                  e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, maxLength);
                } else {
                  e.target.value = '';
                }
              }
            }}
          />
        </>
      )}
      {/* </Box> */}
    </>
  );
}
