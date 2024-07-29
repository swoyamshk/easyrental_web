const Footer = () => (
  <footer className="bg-primary text-primary-foreground py-6 px-6 md:px-10 flex flex-col md:flex-row items-center justify-between">
    <p>© 2024 Easy Rental. All rights reserved.</p>
    <nav className="flex items-center gap-6 mt-4 md:mt-0">
      <a className="hover:underline" href="#">
        Privacy Policy
      </a>
      <a className="hover:underline" href="#">
        Terms of Service
      </a>
    </nav>
  </footer>
);
export default Footer;
