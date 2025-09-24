import React from 'react';
import styled from 'styled-components';

const CertificationsSection = styled.section`
  padding: 80px 10%;
  background: black;
  color: beige;
`;

const SectionTitle = styled.h1`
  text-align: center;
  font-size: 40px;
  margin-bottom: 50px;
  color: white;

  span {
    color: #ff004f;
  }
`;

const CertificationsList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
`;

const CertificationItem = styled.li`
  flex: 1 1 calc(33.333% - 20px);
  min-width: 280px;
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 900px) {
    flex: 1 1 calc(50% - 20px);
  }

  @media (max-width: 600px) {
    flex: 1 1 100%;
  }
`;

const Figure = styled.figure`
  margin: 0;
  position: relative;
`;

const CertificationImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(233, 226, 226, 0.2);
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  ${CertificationItem}:hover & {
    opacity: 1;
  }
`;

const Caption = styled.figcaption`
  padding: 20px;
  text-align: center;
  background: white;

  h2, h6 {
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: #333;
    line-height: 1.4;
  }
`;

const certifications = [
  {
    id: 1,
    image: "/image/image7.png",
    title: "Database Foundations - ORACLE ACADEMY",
    alt: "Oracle Database Foundations Certificate"
  },
  {
    id: 2,
    image: "/image/image5.jpg.png",
    title: "AWS Academy Cloud Foundations",
    alt: "AWS Cloud Foundations Certificate"
  },
  {
    id: 3,
    image: "/image/image8.png",
    title: "Basics of Python - Infosys Springboard",
    alt: "Python Basics Certificate"
  }
];

const Certifications = () => {
  return (
    <CertificationsSection id="certifications">
      <SectionTitle>MY <span>CERTIFICATIONS</span></SectionTitle>
      <CertificationsList>
        {certifications.map((cert) => (
          <CertificationItem key={cert.id}>
            <Figure>
              <div style={{ position: 'relative' }}>
                <CertificationImage src={cert.image} alt={cert.alt} />
                <ImageOverlay />
              </div>
              <Caption>
                <h2>{cert.title}</h2>
              </Caption>
            </Figure>
          </CertificationItem>
        ))}
      </CertificationsList>
    </CertificationsSection>
  );
};

export default Certifications;
