import React, { memo, useCallback, useState } from "react";
import styles from "./Form.module.css";

import SubmitBtn from "./SubmitBtn";
import FormRegBtn from "./FormRegBtn";

import FormHeader from "./formHeader";
import FormContent from "./formContent";

import { modifyData, getFormCtnClasses } from "./helper";

const formValidate = (formData) => {
  const errors = {};
  Object.keys(formData).forEach((key) => {
    if (!formData[key]) {
      errors[key] = `${key} is required`;
    }
  });

  return errors;
};

const MForm = ({
  initialState,
  children,
  onSubmit,
  required = false,
  shouldValidate = false,
  validate,
  ...rest
}) => {
  const [formData, setFormData] = useState(() => {
    if (!initialState) {
      console.error("You need an initial state for your form");
      return {};
    }
    return initialState;
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  const handleChange = useCallback((e) => {
    setFormData((prevData) => modifyData(prevData, e.target));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setSubmitError("");

      if (shouldValidate) {
        const validationErrors =
          typeof validate === "function"
            ? validate(formData)
            : formValidate(formData);
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          return;
        }
      }

      try {
        await onSubmit(formData);
        setFormData(initialState);
        setErrors({});
      } catch (error) {
        console.log(error);
        console.log(error.message);
        setSubmitError("An error occured while submitting the form");
      }
    },
    [initialState, formData, onSubmit, shouldValidate, validate]
  );

  const validateChild = useCallback(
    (child) => {
      if (child.props.required && !formData[child.props.name]) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [child.props.name]: `${child.props.label} is required`,
        }));
      } else if (child.props.validate) {
        const error = child.props.validate(formData[child.props.name]);
        if (error) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [child.props.name]: error,
          }));
        }
      }
    },
    [formData]
  );

  return (
    <div className={getFormCtnClasses(styles, rest)}>
      <form onSubmit={handleSubmit}>
        {React.Children.map(children, (child) => {
          if (child.type === FormHeader) {
            return child;
          }

          if (child.type === FormContent) {
            return React.cloneElement(child, {
              onChange: handleChange,
              formData,
              errors,
              submitError,
              required,
              validate: validateChild,
            });
          }
          return null;
        })}
      </form>
    </div>
  );
};

const Form = memo(MForm);

Form.SubmitBtn = SubmitBtn;
Form.FormRegBtn = FormRegBtn;

export { Form, FormContent, FormHeader };
export default Form;
