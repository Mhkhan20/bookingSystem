import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";


export const metadata = {
  title: "Trimly",
  description: "Precsion & Quality",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <Header />
        {children}
        <Footer />
        </body>
        
    </html>
  );
}
