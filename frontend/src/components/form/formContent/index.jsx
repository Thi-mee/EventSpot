import React from "react";
import style from "../Form.module.css";

import TextField from "./TextField";
import CheckboxField from "./CheckboxField";
import SelectField from "./SelectField";
import { DateField, TimeField } from "./TimeAndDateFields/TimeAndDate";
import SubmitBtn from "../SubmitBtn";
import FormRegBtn from "../FormRegBtn";
import { isValidButton, isValidFormField } from "../helper";

const FormContent = ({
  children,
  onChange,
  formData,
  errors,
  submitError,
  validate,
}) => {
  return (
    <div className={style.formContent}>
      {submitError && <div className="">{submitError}</div>}
      {React.Children.map(children, (child) => {
        if (isValidFormField(child)) {
          return React.cloneElement(child, {
            onChange: onChange,
            value: formData[child.props.name],
            error: errors[child.props.name],
            validate: () => validate(child),
          });
        }

        if (child.type.name === "Flex") {
          return React.cloneElement(child, {
            children: React.Children.map(child.props.children, (child) => {
              if (isValidFormField(child)) {
                return React.cloneElement(child, {
                  onChange: onChange,
                  value: formData[child.props.name],
                  error: errors[child.props.name],
                  validate: () => validate(child),
                });
              }
              return child;
            }),
          });
        }

        if (isValidButton(child)) {
          return child;
        }

        return null;
      })}
    </div>
  );
};

FormContent.TextField = TextField;
FormContent.CheckboxField = CheckboxField;
FormContent.SelectField = SelectField;
FormContent.SubmitBtn = SubmitBtn;
FormContent.FormRegBtn = FormRegBtn;
FormContent.DateField = DateField;
FormContent.TimeField = TimeField;

export default FormContent;
