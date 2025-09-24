import React, { useState } from 'react';
import styled from 'styled-components';
import { FORMSPREE_ID } from '../config';

const ContactSection = styled.section`
  padding: 80px 10%;
  background: #111;
  color: white;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 40px;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const ContactLeft = styled.div`
  flex: 1;
  min-width: 300px;

  h1 {
    font-size: 40px;
    margin-bottom: 20px;

    span {
      color: #ff004f;
    }
  }

  p {
    font-size: 18px;
    color: #ccc;
    margin: 15px 0;
    display: flex;
    align-items: center;

    i {
      color: #ff004f;
      margin-right: 15px;
      font-size: 20px;
      width: 25px;
    }
  }
`;

const SocialIcons = styled.div`
  margin-top: 30px;

  a {
    text-decoration: none;
    color: white;
    font-size: 24px;
    margin-right: 20px;
    transition: 0.3s;

    &:hover {
      color: #ff004f;
    }
  }
`;

const ContactForm = styled.div`
  flex: 1;
  min-width: 300px;
  display: flex;
  justify-content: center;

  form {
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    background: rgba(255, 255, 255, 0.1);
    padding: 30px;
    border-radius: 10px;
    backdrop-filter: blur(10px);
  }
`;

const FormInput = styled.input`
  width: 100%;
  padding: 15px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  background: #222;
  color: white;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border: 2px solid #ff004f;
    background: #333;
  }

  &::placeholder {
    color: #aaa;
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 15px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  background: #222;
  color: white;
  resize: vertical;
  min-height: 120px;
  font-family: inherit;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border: 2px solid #ff004f;
    background: #333;
  }

  &::placeholder {
    color: #aaa;
  }
`;

const SubmitButton = styled.button`
  background: #ff004f;
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 18px;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s;
  margin-top: 10px;
  font-weight: 600;

  &:hover {
    background: #d10040;
    transform: translateY(-2px);
  }

  &:disabled {
    background: #666;
    cursor: not-allowed;
    transform: none;
  }
`;

const SuccessMessage = styled.div`
  background: #4CAF50;
  color: white;
  padding: 15px;
  border-radius: 5px;
  margin-top: 15px;
  text-align: center;
`;

const ErrorMessage = styled.div`
  background: #f44336;
  color: white;
  padding: 15px;
  border-radius: 5px;
  margin-top: 15px;
  text-align: center;
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');

    try {
      if (!FORMSPREE_ID || FORMSPREE_ID === 'your-formspree-id') {
        throw new Error('Formspree ID not configured');
      }

      let response;
      try {
        response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
            _subject: 'New Portfolio Contact Message',
            reply_to: formData.email,
            source: 'react-portfolio'
          })
        });
      } catch (netErr) {
        // Network error (rare). Try a FormData no-cors fallback.
        const fd = new FormData();
        fd.append('name', formData.name);
        fd.append('email', formData.email);
        fd.append('message', formData.message);
        fd.append('_subject', 'New Portfolio Contact Message');
        fd.append('reply_to', formData.email);
        fd.append('source', 'react-portfolio');
        await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: 'POST',
          mode: 'no-cors',
          body: fd
        });
        // We can't read the response in no-cors mode, assume success for UX
        response = { ok: true };
      }

      if (!response.ok) {
        // Try to parse Formspree error details
        try {
          const errJson = await response.json();
          const msg = errJson?.errors?.map(e => e.message).join(' ') || 'Request failed';
          throw new Error(msg);
        } catch (parseErr) {
          throw new Error('Request failed');
        }
      }

      setFormData({ name: '', email: '', message: '' });
      setSubmitStatus('success');
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(
        error?.message === 'Formspree ID not configured'
          ? 'Formspree is not configured. Please set your Formspree form ID in src/config.js.'
          : `${error?.message || 'Something went wrong. Please try again later.'}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <ContactSection id="contact">
      <Container>
        <Row>
          <ContactLeft>
            <h1>Contact <span>Me</span></h1>
            <p>
              <i className="fa-solid fa-envelope"></i>
              sahithia55@gmail.com
            </p>
            <p>
              <i className="fa-solid fa-phone"></i>
              +91 7989589869
            </p>
            <SocialIcons>
              <a 
                href="https://www.linkedin.com/in/lakshmi-sahithi-a-239524260/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-linkedin"></i>
              </a>
              <a 
                href="https://www.instagram.com/sahithiakkireddi" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a 
                href="https://x.com/SahithiA7" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-x-twitter"></i>
              </a>
            </SocialIcons>
          </ContactLeft>
          
          <ContactForm>
            <form onSubmit={handleSubmit}>
              <FormInput
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <FormInput
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <FormTextarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
              />
              <SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'SENDING...' : 'SUBMIT'}
              </SubmitButton>
              
              {submitStatus === 'success' && (
                <SuccessMessage>
                  Thank you! Your message has been sent successfully.
                </SuccessMessage>
              )}
              
              {submitStatus === 'error' && (
                <ErrorMessage>
                  {errorMessage || 'Sorry, there was an error sending your message. Please try again.'}
                </ErrorMessage>
              )}
            </form>
          </ContactForm>
        </Row>
      </Container>
    </ContactSection>
  );
};

export default Contact;
