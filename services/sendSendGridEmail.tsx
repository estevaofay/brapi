import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

interface ISendGridEmail {
  to: string;
  templateId: string;
  dynamicTemplateData: {
    [key: string]: string;
  };
}

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
