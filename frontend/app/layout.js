import "./globals.css";

export const metadata = {
  title: "EventHire - Connect with Event Professionals",
  description: "Post your event requirements and hire professional event planners, performers, and crew",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
