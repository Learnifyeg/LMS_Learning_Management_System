import { useNavigate } from "react-router";

function ContactUs() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background py-8 mt-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center text-sm text-text-secondary mb-4">
            <a href="#" className="hover:text-blue-600" onClick={()=>navigate("/UserLayout")}>Home</a>
            <span className="mx-2">/</span>
            <span className="text-text-secondary">Contact Us</span>
          </div>
          <h1 className="text-3xl font-bold text-text-primary">Contact Us</h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Side - Quick Links */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-text-primary mb-6">Contact Us</h2>
              <ul className="space-y-4">
                {['Help Center', 'Blog', 'Careers', 'Developer Area'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-text-secondary hover:text-blue-600 transition-colors block py-2 border-b border-gray-100">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Side - Contact Information */}
          <div className="lg:col-span-3">
            <div className="bg-card rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-text-primary mb-6">Contact Information</h2>
              
              {/* Main Contact Info */}
              <div className="mb-8">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-text-primary mb-2">Main Address:</h3>
                    <p className="text-text-secondary">
                      #1235 Sks Nagar St No. 8 Phase 3,<br />
                      Pakhowal Road, 141001, LDH, Punjab, India
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-text-primary mb-2">Email Address:</h3>
                    <p className="text-text-secondary">info@learnify@gmail.com</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-text-primary mb-2">Phone Number:</h3>
                    <p className="text-text-secondary">+911234567890, 01610000000</p>
                  </div>
                </div>
              </div>

              {/* Interactive Map */}
              <div className="mb-8">
                <div className="rounded-lg overflow-hidden h-96">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3413.364231300978!2d75.857311975356!3d31.25589637431255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391afb669fe8b4c9%3A0x356d3f63759b2e1e!2sPakhowal%20Road%2C%20Ludhiana%2C%20Punjab%2C%20India!5e0!3m2!1sen!2sus!4v1698765432100!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Learnify Location Map"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 pt-6 border-t border-gray-200 text-center text-text-secondary text-sm">
          {/* <div className="flex flex-wrap justify-center space-x-6 mb-4">
            <a href="#" className="hover:text-gray-900">Copyright Policy</a>
            <a href="#" className="hover:text-gray-900">Terms</a>
            <a href="#" className="hover:text-gray-900">Privacy Policy</a>
          </div> */}
          <p>© 2025 Learnify. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default ContactUs;