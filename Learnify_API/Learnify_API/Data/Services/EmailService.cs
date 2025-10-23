using System.Net;
using System.Net.Mail;

namespace Learnify_API.Data.Services
{
    public class EmailService
    {
        private readonly IConfiguration _config;

        public EmailService(IConfiguration config)
        {
            _config = config;
        }

        public async Task SendEmailAsync(string toEmail, string subject, string body)
        {
            var smtp = new SmtpClient(_config["Email:SmtpServer"], int.Parse(_config["Email:Port"]))
            {
                Credentials = new NetworkCredential(_config["Email:Username"], _config["Email:Password"]),
                EnableSsl = true
            };

            var mail = new MailMessage
            {
                From = new MailAddress(_config["Email:From"]),
                Subject = subject,
                Body = body,
                IsBodyHtml = true
            };

            mail.To.Add(toEmail);
            await smtp.SendMailAsync(mail);
        }
    }
}
