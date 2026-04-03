import "./globals.css";



export const metadata = {
  title: "Trimly",
  description: "Precsion & Quality",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
    
        {children}
    
        </body>
        
    </html>
  );
}
