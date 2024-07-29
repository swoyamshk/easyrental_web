import React from 'react';

const ContactUs = () => {
  return (
    <div className="w-full max-w-6xl mx-auto py-12 md:py-16 px-4 md:px-6">
      <div className="shadow-lg rounded-lg overflow-hidden p-6 bg-white">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold">Contact Us</h1>
          <p className="mt-2 text-muted-foreground">
            Have a question or need assistance? Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    id="name"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    id="email"
                    placeholder="Enter your email"
                    type="email"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="phone"
                >
                  Phone
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="phone"
                  placeholder="Enter your phone number"
                  type="tel"
                />
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="message"
                  rows="5"
                  placeholder="Enter your message"
                ></textarea>
              </div>
              <button
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Contact Us</h2>
              <div className="text-muted-foreground">
                <p>123 Main Street</p>
                <p>Anytown, USA 12345</p>
                <p>Phone: (123) 456-7890</p>
                <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12790.155785010713!2d85.30354525529553!3d27.674166869222162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19ccc9454ff9%3A0xf196445c0330168a!2sJawalakhel%2C%20Lalitpur%2044600!5e1!3m2!1sen!2snp!4v1722186777102!5m2!1sen!2snp"
    width="400"
    height="350"
    style={{ border: 0 }}
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
              </div>
            </div>

          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ContactUs;
