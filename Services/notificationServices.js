// This is a simplified example. In a real scenario, you'd use a mail service like SendGrid, Nodemailer, etc.

exports.sendEmailNotification = async (to, subject, message) => {
    console.log(`Sending email to ${to}: ${subject} - ${message}`);
    // Here you would integrate with an actual email sending service.
    // For simplicity, we're just logging the action.
};
