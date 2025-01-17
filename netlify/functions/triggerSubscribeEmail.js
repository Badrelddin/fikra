const axios = require("axios");
const handler = async function (event) {
  if (event.body === null) {
    return {
      statusCode: 400,
      body: JSON.stringify("Payload required"),
    };
  }
  const requestBody = JSON.parse(event.body);
  // automatically generated snippet from the email preview
  // sends a request to an email handler for a subscribed email
  await axios.post(`${process.env.URL}/.netlify/functions/emails/subscribed`, {
      from: requestBody.inviteeEmail,
      to: requestBody.subscriberEmail,
      subject: "You've been subscribed",
      parameters: {
        name: requestBody.subscriberName,
        email: requestBody.subscriberEmail,
      },
    },
    {headers: {
      "netlify-emails-secret": process.env.NETLIFY_EMAILS_SECRET,
    }});
  return {
    statusCode: 200,
    body: JSON.stringify("Subscribe email sent!"),
  };
};
module.exports = { handler };
