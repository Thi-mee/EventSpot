const mongoose = require("mongoose");

class Validator {
  constructor(data, rules, customMessages) {
    this.data = data;
    this.rules = rules;
    this.customMessages = customMessages;
    this.errorsList = {};
  }

  errors() {
    return this.errorsList;
  }

  passes() {
    let isValid = true;

    for (const field in this.rules) {
      const rules = this.rules[field].split("|");

      for (const rule of rules) {
        if (!this.validateRule(field, rule)) {
          isValid = false;
          break;
        }
      }
    }

    return isValid;
  }

  validateRule(field, rule) {
    let isValid = true;

    const [ruleName, ruleValue] = rule.split(":");

    switch (ruleName) {
      case "required":
        if (!this.data[field]) {
          isValid = false;
          this.addError(field, ruleName);
        }
        break;
      case "email":
        // Simple email validation regex
        const emailRegex =
          /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})$/;
        if (!emailRegex.test(this.data[field])) {
          isValid = false;
          this.addError(field, ruleName);
        }
        break;
      case "min":
        if (this.data[field].length < parseInt(ruleValue)) {
          isValid = false;
          this.addError(field, ruleName);
        }
        break;
      case "max":
        if (this.data[field].length > parseInt(ruleValue)) {
          isValid = false;
          this.addError(field, ruleName);
        }
        break;
      case "integer":
        if (!Number.isInteger(parseInt(this.data[field]))) {
          isValid = false;
          this.addError(field, ruleName);
        }
        break;
      case "boolean":
        if (this.data[field] !== "true" && this.data[field] !== "false") {
          isValid = false;
          this.addError(field, ruleName);
        }
        break;
      case "minValue":
        if (parseInt(this.data[field]) < parseInt(ruleValue)) {
          isValid = false;
          this.addError(field, ruleName);
        }
        break;
      case "maxValue":
        if (parseInt(this.data[field]) > parseInt(ruleValue)) {
          isValid = false;
          this.addError(field, ruleName);
        }
        break;
      case "same":
        if (this.data[field] !== this.data[ruleValue]) {
          isValid = false;
          this.addError(field, ruleName);
        }
        break;
      case "objectId":
        if (!mongoose.Types.ObjectId.isValid(this.data[field])) {
          isValid = false;
          this.addError(field, ruleName);
        }
        break;
      case "in":
        if (!ruleValue.split(",").includes(this.data[field])) {
          isValid = false;
          this.addError(field, ruleName);
        }
        break;
      case "required_if":
        const [otherField, fieldVal] = ruleValue.split(",");

        if (this.data[otherField] === fieldVal && !this.data[field]) {
          isValid = false;
          this.addError(field, ruleName);
        }
        break;
      case "date":
        const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
        if (!dateRegex.test(this.data[field])) {
          isValid = false;
          this.addError(field, ruleName);
        }
        break;
      case "time":
        const timeRegex = /^\d{2}:\d{2}$/;
        if (!timeRegex.test(this.data[field])) {
          isValid = false;
          this.addError(field, ruleName);
        }
        break;

      default:
        break;
    }

    return isValid;
  }

  addError(field, rule) {
    const messageKey = `${rule}.${field}`;
    const message = this.customMessages[messageKey] || `${field} is invalid.`;

    if (!this.errorsList[field]) {
      this.errorsList[field] = [];
    }

    this.errorsList[field].push(message);
  }
}

module.exports = Validator;
