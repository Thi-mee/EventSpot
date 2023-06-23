import React from "react";
import style from "../LandingPage.module.css";
import Card from "../../../components/card";

const Features = () => {
  return (
    <section className={style.section}>
      <h2>Features</h2>
      <div className={style.features}>
        <Card className={style.feature}>
          <h3>Event Creation</h3>
          <p>
            Our platform makes it easy to create and customize events to suit
            your needs. With our user-friendly event builder, you can choose
            from a variety of templates and themes to make your event stand out.
            Add event details, upload images and videos, and customize the look
            and feel of your event page to match your brand.
          </p>
        </Card>
        <Card className={style.feature}>
          <h3>Event Promotion</h3>
          <p>
            Attract more attendees to your events with our built-in promotion
            tools. Share your event on social media platforms such as Facebook,
            Twitter, and LinkedIn to reach a wider audience. Send email
            invitations to your contacts and create targeted ads to attract
            potential attendees. Our platform also integrates with popular
            marketing tools such as Mailchimp and Google Ads to help you promote
            your events more effectively.
          </p>
        </Card>
        <Card className={style.feature}>
          <h3>Ticketing</h3>
          <p>
            Sell tickets and manage registrations directly through our platform.
            Set up multiple ticket types for your event, including general
            admission, VIP, and early bird tickets. Offer discounts and promo
            codes to incentivize early purchases and attract more attendees.
            Track ticket sales in real-time and manage attendee information with
            ease.
          </p>
        </Card>
        <Card className={style.feature}>
          <h3>Analytics</h3>
          <p>
            Keep track of your event’s performance with our real-time analytics
            and insights. Monitor ticket sales, page views, and engagement
            metrics such as likes and shares to see how your event is
            performing. Use this data to make informed decisions about your
            marketing and promotion strategies, and improve your events over
            time.
          </p>
        </Card>
      </div>
    </section>
  );
};

export default Features;
