import { Form, FormContent, FormHeader } from "../../../components/form";
import { useAuth } from "../../../providers/AuthProvider";

const OrganizerRegistrationForm = ({ setView }) => {
  const { registerOrg } = useAuth();
  const handleFormSubmission = (formentries) => {
    console.log(formentries);
    registerOrg(formentries);
  };

  return (
    <Form allRequired={true} onSubmit={handleFormSubmission}>
      <FormHeader
        title="Register as an Organizer"
        description="Please fill in credentials to continue"
      />
      <FormContent>
        <FormContent.TextField name="name" label="Name" placeholder="Name" />
        <FormContent.TextField
          name="email"
          label="Email"
          type="email"
          placeholder="Please enter your email address"
        />
        <FormContent.TextField
          name="phoneNo"
          label="Phone No"
          placeholder="Please enter your Phone number"
        />
        <FormContent.TextField
          name="password"
          label="Password"
          type="password"
          placeholder="Please enter your password"
        />
        <Form.SubmitBtn text="Next" fullWidth />
      </FormContent>
    </Form>
  );
};

export default OrganizerRegistrationForm;
