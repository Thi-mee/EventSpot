import { Form, FormHeader, FormContent } from "../../../components/form";

const UserRegistrationForm = () => {
  return (
    <Form allRequired={true}>
      <FormHeader
        title="Register as a User"
        subtitle="Please fill in credentials to continue."
        error="error"
      />
      <FormContent.TextField name="name" label="Name" placeholder="Name" />
      <FormContent.TextField name="email" label="Email" placeholder="Email" />
      <FormContent.TextField
        name="password"
        label="Password"
        placeholder="Password"
      />
      <Form.SubmitBtn text="Register" fullWidth />
    </Form>
  );
};

export default UserRegistrationForm;
