# ✂️ Trimly – Your Personal Barber Booking System

**Trimly** is a minimalist web-based platform that simplifies the way clients book haircuts and grooming services.Trimly lets users schedule appointments based on your real-time availability—no calls, no back-and-forth.

## 🚀 Live Demo

👉 [Visit Trimly](https://booking-system-nu-beryl.vercel.app/welcome)  


---

## 📸 Preview

![Trimly Homepage](![alt text](image-1.png))  



## 💡 Features

- 📅 **Live Booking System**  
  Users can view your calendar availability and confirm appointments instantly.

- 📬 **Email Notifications**  
  Bookings and cancellations trigger real-time email confirmations via EmailJS.

- 🔐 **Secure Authentication**  
  Firebase Auth manages user sign-up, login, and session control.

- 🗂️ **Firestore Integration**  
  Stores appointment data securely and enables real-time syncing.

- ⚡ **Fast & Responsive UI**  
  Built with React and optimized for mobile and desktop experiences.

---

## 🛠️ Tech Stack

| Technology  | Purpose                                |
|-------------|----------------------------------------|
| Next.js     | React framework with server-side power |
| Firebase    | Auth + Firestore for backend-as-a-service |
| EmailJS     | Trigger email notifications client-side |
| Vercel      | Seamless deployment & hosting platform |

---

## 📦 Getting Started (Developers)

To run Trimly locally on your machine:

```bash
# 1. Clone this repository
git clone https://github.com/your-username/bookingSystem.git
cd bookingSystem

# 2. Install dependencies
npm install

# 3. Set up environment variables
# Create a file named `.env.local` in the root directory
# Add your Firebase and EmailJS credentials like so:

NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_USER_ID=your_user_id

# 4. Run the development server
npm run dev
