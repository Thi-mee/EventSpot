import { newFormObj, validateForm, objIsEmpty } from "./helper";

// describe('newFormObj', () => {
  // it('should update the state value object', () => {
  //   const prevFormObj = {
  //     name: 'John',
  //     email: 'timi@test.com',
  //     password: '123456',
  //   }
  //   const target = {
  //     name: 'email',
  //     value: 'timi@test.uk',
  //     type: 'email',
  //   }
  //   const expected = {
  //     name: 'John',
  //     email: 'timi@test.uk',
  //     password: '123456',
  //   }
  //   expect(newFormObj(prevFormObj, target)).toEqual(expected);
  // });

  // it('should update checkbox state correctly', () => {
  //   const prevFormObj = {
  //     name: 'John',
  //     email: 'timi@test.com',
  //     isActive: false,
  //   }
  //   const target = {
  //     name: 'isActive',
  //     checked: true,
  //     type: 'checkbox',
  //   }
  //   const expected = {
  //     name: 'John',
  //     email: 'timi@test.com',
  //     isActive: true,
  //   }
  //   expect(newFormObj(prevFormObj, target)).toEqual(expected);
  // });
// });

describe("validateForm", () => {
  it("should return an empty object if the form is valid", () => {
    const formObj = {
      name: "John Doe",
      email: "johndoe@example.com",
    };
    const formRules = {
      name: {
        required: true,
        
      },
      email: {
        required: true,
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      },
    };
    const errors = validateForm(formObj, formRules);
    expect(errors).toEqual({});
  });

  it("should return an object with errors if the form is invalid", () => {
    const formObj = {
      name: "",
      email: "johndoe@example.com",
    };
    const formRules = {
      name: {
        required: true,
      },
      email: {
        required: true,
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      },
    };
    const errors = validateForm(formObj, formRules);
    expect(errors).toEqual({
      name: "This field is required",
    });
  });
});

describe("objIsEmpty", () => {
  it("should return true if the object is empty", () => {
    const obj = {};
    expect(objIsEmpty(obj)).toBe(true);
  });

  it("should return false if the object is not empty", () => {
    const obj = {
      name: "John Doe",
      email: "johndoe@example.com",
    };
    expect(objIsEmpty(obj)).toBe(false);
  });
});