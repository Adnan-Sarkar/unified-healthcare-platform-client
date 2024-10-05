import { SxProps } from "@mui/system";
import { Controller, useFormContext } from "react-hook-form";
import { Avatar, MenuItem, TextField } from "@mui/material";

type SimpleItem = {
  value: string; // actual value for backend
  label: string; // What user sees
};

type ComplexItem = {
  value: string; // actual value for backend
  label: string; // What user sees
  avatarUrl: string;
};

type CustomSelectFieldProps = {
  name: string;
  size?: "small" | "medium";
  placeholder?: string;
  label?: string;
  required?: boolean;
  fullWidth?: boolean;
  sx?: SxProps;
  items: SimpleItem[] | ComplexItem[];
  isComplex?: boolean;
  defaultValue?: string;
};

const Select = ({
  items,
  name,
  label,
  size = "small",
  required,
  fullWidth = true,
  sx,
  isComplex = false,
  defaultValue
}: CustomSelectFieldProps) => {
  const { control, formState } = useFormContext();
  const isError = formState.errors[name] !== undefined;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextField
          {...field}
          sx={{
            ...sx,
          }}
          size={size}
          select
          label={label}
          defaultValue={defaultValue}
          required={required}
          fullWidth={fullWidth}
          error={isError}
          helperText={
            isError ? (formState.errors[name]?.message as string) : ""
          }
        >
          {items.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {isComplex && "avatarUrl" in item && (
                <Avatar
                  src={(item as ComplexItem).avatarUrl}
                  alt={item.label}
                  sx={{ width: 24, height: 24, marginRight: 1 }}
                />
              )}
              {item.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};

export default Select;
