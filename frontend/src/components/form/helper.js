const VALIDFORMFIELDS = [
  "TextField",
  "CheckboxField",
  "SelectField",
  "DateField",
  "TimeField",
];

const BUTTONS = ["SubmitBtn", "FormRegBtn"]

export const isValidFormField = (child) => VALIDFORMFIELDS.includes(child?.type?.type?.name);

export const isValidButton = (child) => BUTTONS.includes(child?.type?.type?.name);


// const handleChange = (e) => {
//   if (e.target.value > 23 && e.target.id === "hours") return;
//   if (e.target.value > 59) return;
//   if (e.target.value < 0) e.target.value = 0;
//   if (e.target.value === "") e.target.value = baseNumber;

//   setTime({
//     ...time,
//     [e.target.id]: parseInt(e.target.value).toLocaleString("en-US", {
//       minimumIntegerDigits: 2,
//     }),
//   });

//   onChange();
// };



// let baseNumber = 0;
// baseNumber = baseNumber.toLocaleString("en-US", {
//   minimumIntegerDigits: 2,
// });

// const [time, setTime] = useState({
//   hours: '--',
//   minutes: '--',
// });

// useEffect(() => {
//   // get time in time format
//   const timeString = `${time.hours}:${time.minutes}`;
//   onChange(timeString);
// }, [time, onChange]);







export const modifyData = (prevFormObj, target) => {
  const { name, value, type } = target;
  
  if (type === 'number') {
    if (prevFormObj[name] === 0 && value === '') {
      return prevFormObj;
    }
    const num = value === '' ? 0 : parseInt(value);
    console.log(num)
    return {
      ...prevFormObj,
      [name]: num
    }
  }
  return {
    ...prevFormObj,
    [name]: value ?? ''
  }
}

export const validateForm = (formObj, formRules) => {
  const errors = {};
  for (const [key, value] of Object.entries(formRules)) {
    if (value.required && !formObj[key]) {
      errors[key] = 'This field is required';
    }
    if (value.minLength && formObj[key].length < value.minLength) {
      errors[key] = `This field must be at least ${value.minLength} characters long`;
    }
    if (value.maxLength && formObj[key].length > value.maxLength) {
      errors[key] = `This field must be at most ${value.maxLength} characters long`;
    }
    if (value.pattern && !value.pattern.test(formObj[key])) {
      errors[key] = value.patternMessage;
    }
  }
  return errors;
}

export const objIsEmpty = (obj) => (
  Object.keys(obj).every(key => !obj.hasOwnProperty(key))
)

export const getFormControlRules = (validationRules, props) => {
  const { name, required, minLength, maxLength, pattern, patternMessage, type } = props;
  if (required) {
    validationRules.has(name)
      ? validationRules.get(name).required = true
      : validationRules.set(name, {
        required: true,
        type: type === 'checkbox' ? 'checkbox'
          : type === 'email' ? 'email'
            : type === 'password' ? 'password'
              : 'text'
      });
  }
  if (minLength) {
    validationRules.has(name)
      ? validationRules.get(name).minLength = minLength
      : validationRules.set(name, {
        minLength, type: type === 'checkbox' ? 'checkbox'
          : type === 'email' ? 'email'
            : type === 'password' ? 'password'
              : 'text'
      });
  }
  if (maxLength) {
    validationRules.has(name)
      ? validationRules.get(name).maxLength = maxLength
      : validationRules.set(name, {
        maxLength, type: type === 'checkbox' ? 'checkbox'
          : type === 'email' ? 'email'
            : type === 'password' ? 'password'
              : 'text'
      });
  }
  if (pattern) {
    validationRules.has(name)
      ? validationRules.get(name).pattern = pattern
      : validationRules.set(name, {
        pattern, patternMessage, type: type === 'checkbox' ? 'checkbox'
          : type === 'email' ? 'email'
            : type === 'password' ? 'password'
              : 'text'
      });
  }
  return validationRules;
}

export const getFormCtnClasses = (styles, props) => {
  var classes = new Set([styles.formContainer]);

  if (props.width) {
    classes.add(styles[props.width]);
  }
  if (props.theme) {
    classes.add(styles[props.theme]);
  }

  return Array.from(classes).join(' ');
}
