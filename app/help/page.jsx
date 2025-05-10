import BackButton from "../components/BackButton";

export default function HelpPage() {
  return (
    <div className="aboutContainer" >
    <BackButton/>            
        <div className="innerAboutContainer"> 

            <h1>Help & Support</h1>

      <h2 style={{ marginTop: "1.5em" }}>How to Book an Appointment</h2>
      <p>
        1. Login by clicking <strong>Book a haircut</strong>.<br />
        2. Choose a date and time slot.<br />
        3. Select your preferred service (Haircut, Beard Trim, or Combo).<br />
        4. Enter your name and confirm your booking.<br />
        You’ll receive an email once your appointment is confirmed.
      </p>

      <h2 style={{ marginTop: "1.5em" }}>How to Cancel a Booking</h2>
      <p>
        If you’ve already made a booking and need to cancel:
        <br />
        - Visit the <strong>Cancel Booking</strong> page.<br />
        - Enter the same email you used during booking.<br />
        - Click <em>Cancel Booking</em> and you’ll get a confirmation email.
        <br />
        <br />
        <strong>Note:</strong> Only one active booking is allowed per user. If you want to reschedule, please cancel the existing one first.
      </p>

      <h2 style={{ marginTop: "1.5em" }}>Didn’t Receive a Confirmation Email?</h2>
      <p>
        - Double-check your spam or promotions folder.<br />
        - Make sure the email you entered was correct.<br />
        - Still no email? Feel free to text me directly at <strong>506-230-9440</strong> 
      </p>

      <h2 style={{ marginTop: "1.5em" }}>Contact & Support</h2>
   
    
        <p>
        Got a question or issue? I’m here to help:
        <br /> <br/>
        📞 Text: <strong>506-230-9440</strong>
        <br /> <br/>
        📧 Email: <strong>q23da@unb.ca</strong>
      </p>
   
       
    </div>


        </div>
      
  );
}
