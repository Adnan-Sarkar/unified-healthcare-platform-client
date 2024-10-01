import React from "react";
import { SxProps } from "@mui/system";
import { Controller, useFormContext } from "react-hook-form";
import dayjs from "dayjs";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import enGB from "dayjs/locale/en-gb";

dayjs.extend(customParseFormat);
dayjs.locale(enGB);

type CustomDatePickerProps = {
  name: string;
  size?: "small" | "medium";
  label?: string;
  required?: boolean;
  fullWidth?: boolean;
  sx?: SxProps;
  disablePast?: boolean;
};

const DatePicker = ({
  name,
  size = "small",
  label,
  required,
  fullWidth = true,
  sx,
  disablePast = true,
}: CustomDatePickerProps) => {
  const { control, getValues } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={getValues(name) || dayjs().format("DD/MM/YYYY")}
      render={({ field: { onChange, value, ...field } }) => (
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          adapterLocale={"en-gb"}
        >
          <DesktopDatePicker
            label={label}
            timezone="system"
            disablePast={disablePast}
            {...field}
            value={value ? dayjs(value, "DD/MM/YYYY", true) : null}
            onChange={(date) =>
              onChange(date ? date.format("DD/MM/YYYY") : null)
            }
            format="DD/MM/YYYY"
            slotProps={{
              textField: {
                required: required,
                size: size,
                sx: {
                  ...sx,
                },
                variant: "outlined",
                fullWidth: fullWidth,
              },
            }}
          />
        </LocalizationProvider>
      )}
    />
  );
};

export default DatePicker;
