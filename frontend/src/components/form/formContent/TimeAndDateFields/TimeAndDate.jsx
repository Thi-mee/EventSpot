import { memo } from "react";
import styles from "../style.module.css";
import timeStyles from "./TimeAndDate.module.css";

const getTimeClasses = (styles, props) => {
  const classes = new Set([styles.timeField]);
  classes.add(props.width?.toLowerCase() ?? styles.full);
  return Array.from(classes).join(" ");
};

const TimePicker = ({ onChange, value }) => {
  console.log(value);
  const handleChange = (e, i) => {
    console.log(e.target.value);
    // check if its the hours or minutes input
    if (i === 1) {
      if (isNaN(e.target.value)) {
        e.target.value = value.split(":")[0];
        return;
      }

      if (parseInt(e.target.value) > 23) {
        e.target.value = 23;
      } else if (parseInt(e.target.value) < 0) {
        e.target.value = 0;
      } else if (e.target.value.length === 1) {
        e.target.value = "0" + e.target.value;
      }
    } else {
      if (isNaN(e.target.value)) {
        e.target.value = value.split(":")[1];
        return;
      }

      if (parseInt(e.target.value) > 59) {
        e.target.value = 59;
      }
      if (parseInt(e.target.value) < 0) {
        e.target.value = 0;
      }
      if (e.target.value.length === 1) {
        e.target.value = "0" + e.target.value;
      }
    }
    const newEvent = {
      target: {
        type: "time",
        value:
          i === 1
            ? `${e.target.value}:${value.split(":")[1]}`
            : `${value.split(":")[0]}:${e.target.value}`,
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
            onChange={(e) => handleChange(e, 1)}
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
            onChange={(e) => handleChange(e, 2)}
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
      <label htmlFor="time">{label}</label>
      <TimePicker
        value={value}
        onChange={(event) => onChange({ target: { ...event.target, name } })}
      />
      <p className={styles.errorText}>{error ?? null}</p>
    </div>
  );
};

const DateField = ({
  name = "date",
  label = "Date",
  onChange,
  errorText,
  required,
}) => {
  return (
    <div className={styles.dateField}>
      <label htmlFor={name} className={required ? styles.required : null}>
        {label}
      </label>
      <div className={timeStyles.dateWrapper}>
        <input type="date" name={name} id="date" onChange={onChange} />
      </div>
      <p className={styles.errorText}>{errorText ?? null}</p>
    </div>
  );
};

const MemoizedTimeField = memo(TimeField);
const MemoizedDateField = memo(DateField);

export { MemoizedTimeField as TimeField, MemoizedDateField as DateField };
