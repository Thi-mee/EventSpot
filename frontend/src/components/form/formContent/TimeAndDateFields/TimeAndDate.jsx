import { memo } from "react";
import styles from "../style.module.css";
import timeStyles from "./TimeAndDate.module.css";

const getTimeClasses = (styles, props) => {
  const classes = new Set([styles.timeField]);
  classes.add(props.width?.toLowerCase() ?? styles.full);
  return Array.from(classes).join(" ");
};

const TimePicker = ({ onChange, value }) => {
  const handleHoursChange = (e) => {
    let newHour = parseInt(e.target.value);
    if (isNaN(newHour)) return;
    if (newHour.length > 2) return;
    if (parseInt(newHour) > 23) newHour = 23;
    if (parseInt(newHour) < 0) newHour = 0;
    if (newHour.toString().length === 1) {
      newHour = "0" + newHour;
    }

    const newEvent = {
      target: {
        type: "time",
        value: `${newHour}:${value.split(":")[1]}`,
      },
    };
    onChange(newEvent);
  };

  const handleMinutesChange = (e) => {
    let newMinutes = parseInt(e.target.value);
    if (newMinutes.length > 2) return;
    if (isNaN(newMinutes)) return;
    if (parseInt(newMinutes) > 59) newMinutes = 59;
    if (parseInt(newMinutes) < 0) return;
    if (newMinutes.toString().length === 1) {
      newMinutes = "0" + newMinutes;
    }
    const newEvent = {
      target: {
        type: "time",
        value: `${value.split(":")[0]}:${newMinutes}`,
      },
    };
    onChange(newEvent);
  };

  return (
    <div id={timeStyles.time_wrapper}>
      <div id={timeStyles.time_input}>
        <label htmlFor="hours">
          <input
            id="hours"
            value={value.split(":")[0]}
            onChange={handleHoursChange}
            placeholder="--"
            max={23}
            min={0}
          />
          {/* <span className={`${timeStyles.label} ${timeStyles["lbl-hrs"]}`}>
            hours
          </span> */}
        </label>
        <span>:</span>
        <label htmlFor="minutes">
          <input
            id="minutes"
            value={value.split(":")[1]}
            onChange={handleMinutesChange}
            placeholder="--"
            min={0}
            max={59}
          />
          {/* <span className={`${timeStyles.label} ${timeStyles["lbl-min"]}`}>
            minutes
          </span> */}
        </label>
      </div>
    </div>
  );
};

const TimeField = ({
  name,
  label = "Time",
  onChange,
  error,
  value,
  required,
  ...rest
}) => {
  return (
    <div className={getTimeClasses(styles, rest)}>
      <label htmlFor="time" className={required ? styles.required : null}>
        {label}
      </label>
      <TimePicker
        value={value}
        onChange={(event) => onChange({ target: { ...event.target, name } })}
      />
      <div className={styles.extratext}>
        {error ? (
          <p className={styles.errorText}>{rest.errorText ?? error}</p>
        ) : rest.helperText ? (
          <p className={styles.helperText}>{rest.helperText}</p>
        ) : null}
      </div>
    </div>
  );
};

const DateField = ({
  name = "date",
  label = "Date",
  onChange,
  error,
  required,
  value,
  ...rest
}) => {
  return (
    <div className={styles.dateField}>
      <label htmlFor={name} className={required ? styles.required : null}>
        {label}
      </label>
      <div className={timeStyles.dateWrapper}>
        <input
          type="date"
          name={name}
          id="date"
          onChange={onChange}
          value={value}
        />
      </div>
      <div className={styles.extratext}>
        {rest.errorText ? (
          <p className={styles.errorText}>{error}</p>
        ) : rest.helperText ? (
          <p className={styles.helperText}>{rest.helperText}</p>
        ) : null}
      </div>
    </div>
  );
};

const MemoizedTimeField = memo(TimeField);
const MemoizedDateField = memo(DateField);

export { MemoizedTimeField as TimeField, MemoizedDateField as DateField };
