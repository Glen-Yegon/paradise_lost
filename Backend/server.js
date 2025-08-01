const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000; // or any other port
const path = require("path");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/assets', express.static(path.join(__dirname, '../Frontend')));


// Serve static files (your HTML, CSS) if needed
app.use(express.static("public"));

// Contact form POST route
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: "info@paradiselostke.com",
    pass: "wUesy7xyTZrg", // ⚠️ This should be an app password
  },
  tls: {
    rejectUnauthorized: false, // ✅ helps with self-signed certs
  },
});



  try {
    // Send email to yourself
    await transporter.sendMail({
      from: `"Paradise Lost Website" <info@paradiselostke.com>`,
      to: "info@paradiselostke.com",
      subject: "New Contact Form Submission",
      html: `
        <h3>New Message from Paradise Lost Contact Form</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    });

    // Send autoresponse to the sender
    await transporter.sendMail({
      from: `"Paradise Lost Team" <info@paradiselostke.com>`,
      to: email,
      subject: "Thanks for Reaching Out to Paradise Lost 🌴",
html: `
  <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 40px; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">

      <!-- Logo -->
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="http://localhost:5000/assets/logo.png" alt="Paradise Lost Logo" style="height: 70px;" />
      </div>

      <!-- Greeting -->
      <h2 style="color: #008080; text-align: center;">Thank you, ${name}!</h2>

      <!-- Message -->
      <p style="font-size: 16px; color: #333333; line-height: 1.6;">
        We appreciate you for reaching out to <strong>Paradise Lost Kenya</strong>. Your message has been received successfully and is currently being reviewed by our support team.
      </p>

      <p style="font-size: 16px; color: #333333; line-height: 1.6;">
        At Paradise Lost, we believe in creating unforgettable experiences. Whether you're planning a family getaway, a corporate retreat, or an adventure with friends, our team is here to assist you every step of the way.
      </p>

      <p style="font-size: 16px; color: #333333; line-height: 1.6;">
        Expect a personalized reply from one of our team members within 24 hours. In the meantime, you can explore our offerings, view galleries, or book your next experience directly from our website.
      </p>

      <!-- Call to Action -->
      <div style="text-align: center; margin: 30px 0;">
        <a href="https://paradiselostke.com" style="background-color: #008080; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Visit Website</a>
      </div>

      <!-- Footer -->
      <hr style="border: none; border-top: 1px solid #dddddd;" />
      <p style="font-size: 13px; color: #777777; text-align: center;">
        Paradise Lost Kenya · Nairobi, Kenya<br />
        <a href="mailto:info@paradiselostke.com" style="color: #777;">info@paradiselostke.com</a><br />
        <a href="https://paradiselostke.com" style="color: #777;">www.paradiselostke.com</a>
      </p>

    </div>
  </div>
`,
    });

    res.status(200).json({ message: "Emails sent successfully." });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({ error: "Failed to send email. Try again later." });
  }
});


app.post('/submit-review', async (req, res) => {
  const { name, review, email, rating } = req.body;

  
const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: "info@paradiselostke.com",
    pass: "wUesy7xyTZrg", // ⚠️ This should be an app password
  },
  tls: {
    rejectUnauthorized: false, // ✅ helps with self-signed certs
  },
});

  try {
    // Send review to site owner
    await transporter.sendMail({
      from: '"Paradise Lost" <info@paradiselostke.com>',
      to: "info@paradiselostke.com",
      subject: "New Review Submitted",
      html: `
        <p><strong>Name:</strong> ${name || 'Anonymous'}</p>
        <p><strong>Rating:</strong> ${rating} ⭐</p>
        <p><strong>Review:</strong> ${review}</p>
        <p><strong>Email:</strong> ${email || 'Not provided'}</p>
      `,
    });

    // Send autoresponse to reviewer (if email was provided)
    if (email) {
      await transporter.sendMail({
        from: '"Paradise Lost Team" <info@paradiselostke.com>',
        to: email,
        subject: "Thanks for Your Review 🌟",
html: `
  <div style="font-family: 'Segoe UI', sans-serif; background-color: #f4f4f4; padding: 40px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; padding: 30px; box-shadow: 0 5px 20px rgba(0,0,0,0.1); text-align: center;">
      
      <!-- Logo -->
      <img src="https://paradiselostke.com/assets/logo.png" alt="Paradise Lost Logo" style="height: 60px; margin-bottom: 20px;" />
      
      <!-- Heading -->
      <h2 style="color: #008080; margin-bottom: 10px;">Thank you${name ? ', ' + name : ''}!</h2>

      <!-- Body -->
      <p style="color: #444; font-size: 16px; line-height: 1.6;">
        We truly appreciate your ${rating}-star review. Your feedback helps us grow and improve our experiences at <strong>Paradise Lost Kenya</strong>.
      </p>

      <p style="color: #444; font-size: 15px;">
        Curious about what else we offer? Visit our website and stay in touch:
        <br />
        <a href="https://paradiselostke.com" style="color: #008080; text-decoration: none;">paradiselostke.com</a>
      </p>

      <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />

      <p style="font-size: 13px; color: #999;">
        Paradise Lost Team<br />
        This is an automated thank-you message — no reply needed.
      </p>
    </div>
  </div>
`,
      });
    }

    res.json({ message: "Review submitted successfully. Thank you!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "There was a problem submitting your review." });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
