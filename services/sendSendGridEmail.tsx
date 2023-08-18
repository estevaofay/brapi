import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

interface ISendGridEmail {
  to: string;
  templateId: string;
  dynamicTemplateData: {
    [key: string]: string;
  };
}

// Example
// const emails = [{
//   email: 'test@email.com',
//   username: 'Test',
// }]
// const messages = emails.map((email) => {
//   return {
//     to: email.email,
//     templateId: 'd-af3b25ffbfafbfb43f2b42sesfs321',
//     dynamicTemplateData: {
//       username: email.username,
//     },
//   };
// });
// await Promise.all(messages.map((message) => sendSendGridEmail(message)));

export const sendSendGridEmail = async (msg: ISendGridEmail) => {
  try {
    await sgMail.send({
      ...msg,
      from: 'Ali na brapi<contato@brapi.dev>',
      replyTo: 'alisson@brapi.dev',
    });

    console.log(`[SendGrid] email sent to ${msg.to}`);
  } catch (error) {
    console.error(error);

    if (error?.response) {
      console.error(error?.response?.body);
    }
  }
};
