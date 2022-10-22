import { useState, useEffect } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import TextField from "@mui/material/TextField";
import { InputText } from "../input.styles";

const getNextDate = () => {
  let date = new Date();
  date.setDate(date.getDate() + 1);
  date.setHours(0, 0, 0, 0);

  return date;
};

const DateInput = ({
  id,
  label,
  required,
  onChange,
  variant,
  nextDateFunc = getNextDate,
  isRetiro,
}) => {
  const [nextDate, setNextDate] = useState(nextDateFunc());

  const onFocus = () => {
    const newDate = nextDateFunc();
    setNextDate(newDate);
  };

  const fecha = new Date();
  const isFriday = fecha.getDay();
  const dias = isFriday == 5 || isFriday == 4 ? 4 : 3;
  fecha.setDate(fecha.getDate() + dias);

  return (
    <DayPickerInput
      component={(props, ref) => (
        <TextField
          id={id}
          label={label}
          required={required}
          variant={variant}
          fullWidth
          {...props}
          {...ref}
          variant="standard"
        />
      )}
      onDayChange={onChange}
      onDayPickerShow={onFocus}
      placeholder="YYYY-MM-DD"
      dayPickerProps={{
        initialMonth: nextDate,
        modifiers: {
          disabled: [
            {
              daysOfWeek: [0, 7],
            },
            {
              before: nextDate,
            },

            { after: isRetiro ? fecha : null },
          ],
        },
        selectedDays: nextDate,
        months: [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre",
        ],
        weekdaysLong: [
          "Domingo",
          "Lunes",
          "Martes",
          "Miércoles",
          "Jueves",
          "Viernes",
          "Sábado",
        ],
        weekdaysShort: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
      }}
      style={{ width: "100%", zIndex: "10000 !important" }}
    />
  );
};

export default DateInput;
