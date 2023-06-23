import React from "react";
import { Form, FormContent, FormHeader } from "../../../components/form";
import Flex from "../../../components/layout/Flex";
import { useEventContext } from "../../../providers/EventProvider";
import dayjs from "dayjs";
import withAuth from "../../../components/HOC/withAuth";

const CreateEventPage = ({user}) => {
  const { isLoading, createEvent } = useEventContext();

  const handleSubmission = (data) => {
    data.date = dayjs(data.date).format('DD-MM-YYYY');
    console.log(data);
    createEvent(data, (res) => {
      if (res.error) throw new Error("Error creating event");
      console.log(res);
      if (res.success) {
        alert("Event Created Successfully");
      }
    });
  };

  return (
    <div style={{
      position: "relative",
    }}>
      {isLoading && <div style={{
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 100,
      }}><p>Loading...</p></div>}
      <Form
        initialState={{
          name: "",
          description: "",
          category: "",
          type: "",
          location: "",
          date: new Date().toISOString().substring(0, 10),
          time: dayjs().format("HH:mm"),
          totalNumberOfSeats: 1,
          organizerId: user?.id,
        }}
        width="full"
        onSubmit={handleSubmission}
        required>
        <FormHeader
          title="Create Event"
          subtitle="Fill in your Event Details in the fields below"
        />
        <FormContent>
          <FormContent.TextField
            label="Event Name"
            name="name"
            placeholder="Enter the name of your event"
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
            label="Event Location"
            name="location"
            placeholder="Enter a Location for your event"
            type="textarea"
          />
          <Flex gap={1}>
            <FormContent.DateField label="Start Date" name="date" />
            <FormContent.TimeField label="Start Time" name="time" />
            <FormContent.TextField
              label="Total Number of Seats"
              name="totalNumberOfSeats"
              type="number"
              width="third"
              min={1}
            />
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

export default withAuth(CreateEventPage);
