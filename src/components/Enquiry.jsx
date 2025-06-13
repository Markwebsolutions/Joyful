import  { useState } from 'react';
import "./Header.css";

const EnquiryModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    product: 'Sumo Potty',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="enquiry-modal-overlay">
      <div className="enquiry-modal-content">
        <button 
          className="enquiry-modal-close"
          onClick={onClose}
          aria-label="Close enquiry form"
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M18 6L6 18" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M6 6L18 18" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
        
        <h2 className="enquiry-modal-title">Product Enquiry</h2>
        
        <form onSubmit={handleSubmit} className="enquiry-form">
          <div className="enquiry-form-group">
            <label htmlFor="fullName">Full Name*</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="enquiry-form-group">
            <label htmlFor="email">Email Address*</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="enquiry-form-group">
            <label htmlFor="phone">Phone number*</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          {/* <div className="enquiry-form-group">
            <label htmlFor="product">Product</label>
            <input
              type="text"
              id="product"
              name="product"
              value={formData.product}
              onChange={handleChange}
              readOnly
              className="enquiry-product-input"
            />
          </div> */}

          <div className="enquiry-form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Type your message"
              className="enquiry-message-input"
            />
          </div>

          <button type="submit" className="enquiry-submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnquiryModal;