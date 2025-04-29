import './globals.css';

export const metadata = {
  title: 'TaskList',
  description: 'Get more productive!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <footer className="py-6 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} TaskList </p>
        </footer>
      </body>
    </html>
  );
}