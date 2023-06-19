import React from "react";
import withOrganizerAuthentication from "../../../components/HOC/withAuth";
// import style from "./CreateEventPage.module.css";
import {
  Form,
  FormContent,
  FormHeader,
} from "../../../components/form";
import Flex from "../../../components/layout/Flex";
import { useEventContext } from "../../../providers/EventProvider";

const CreateEventPage = () => {
  const { isLoading, createEvent } = useEventContext();

  const handleSubmission = (data) => {
    console.log(data)
    // createEvent(data, (res) => {
    //   console.log(res);
    //   if (res.success) {
    //     alert("Event Created Successfully");
    //   }
    // });
  };

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      <Form 
        initialState={{
          name: "",
          description: "",
          category: "",
          type: "",
          location: "",
          date: "",
          time: "",
          seats: "",
        }}
        width="full" 
        onSubmit={handleSubmission}
        >
        <FormHeader
          title="Create Event"
          subtitle="Fill in your Event Details in the fields below"
        />
        <FormContent>
          <FormContent.TextField
            label="Event Name"
            name="name"
            placeholder="Enter the name of your event"
            required={true}
          />
          <FormContent.TextField
            label="Event Description"
            name="description"
            placeholder="Enter a description for your event"
            type="textarea"
          />
          <Flex gap={1}>
            <FormContent.SelectField
              label="Event Category"
              name="category"
              width="half"
              options={[
                { value: "music", label: "Music" },
                { value: "sports", label: "Sports" },
                { value: "arts", label: "Arts" },
                { value: "food", label: "Food" },
                { value: "other", label: "Other" },
              ]}
            />
            <FormContent.SelectField
              label="Event Type"
              name="type"
              width="half"
              options={[
                { value: "hybrid", label: "Hybrid" },
                { value: "online", label: "Online" },
                { value: "in-person", label: "In-Person" },
              ]}
            />
          </Flex>
          <FormContent.TextField
            required={false}
            label="Event Location"
            name="location"
            placeholder="Enter a Location for your event"
            type="textarea"
            helperText="If not Online, Enter the location of your event"
          />
          <Flex gap={1}>
            <FormContent.DateField label="Start Date" name="date" />
            <FormContent.TimeField label="Start Time" name="time" />
          <FormContent.TextField label="No of Reservations" name="seats" type="number" />
          </Flex>
          <Form.SubmitBtn />
        </FormContent>
      </Form>

      {/* <div className={style.form}>
                ============================
                <option value="">Select a type</option>
                <option value="free">Free</option>
                <option value="paid">Paid</option>
                ============================

              <label htmlFor="image">Event Image</label>
              <input
                type="file"
                name="image"
                id="image"
                onChange={(e) =>
                  setEventDetails({ ...eventDetails, image: e.target.files[0] })
                }
              />
          </div> */}
    </div>
  );
};

export default withOrganizerAuthentication(CreateEventPage);
