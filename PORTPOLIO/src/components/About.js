import React, { useState } from 'react';
import styled from 'styled-components';

const AboutSection = styled.section`
  padding: 80px 10%;
  background: black;
  color: beige;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const AboutCol1 = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
  }

  @media only screen and (max-width: 768px) {
    margin-bottom: 30px;
  }
`;

const AboutCol2 = styled.div`
  flex: 1;
  text-align: left;
  padding-left: 50px;

  h1 {
    font-size: 40px;
    color: white;
    margin-bottom: 20px;

    span {
      color: #ff004f;
    }
  }

  p {
    font-size: 18px;
    color: beige;
    line-height: 1.6;
    margin-bottom: 30px;
  }

  @media only screen and (max-width: 768px) {
    padding-left: 0;
    text-align: center;
  }
`;

const TabTitles = styled.div`
  display: flex;
  margin: 20px 0 40px;

  @media only screen and (max-width: 768px) {
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const TabLink = styled.p`
  margin-right: 50px;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  position: relative;
  color: ${props => props.active ? '#ff004f' : 'beige'};

  &::after {
    content: "";
    width: ${props => props.active ? '50%' : '0'};
    height: 3px;
    background: #ff004f;
    position: absolute;
    left: 0;
    bottom: -8px;
    transition: 0.5s;
  }

  &:hover::after {
    width: 50%;
  }

  @media only screen and (max-width: 768px) {
    margin: 10px 20px;
  }
`;

const TabContent = styled.div`
  display: ${props => props.active ? 'block' : 'none'};

  ul {
    list-style: none;
    padding: 0;

    li {
      margin: 10px 0;
      font-size: 16px;

      span {
        color: #D70654;
        font-size: 14px;
        font-weight: bold;
      }
    }
  }
`;

const About = () => {
  const [activeTab, setActiveTab] = useState('EDUCATION');

  const openTab = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <AboutSection id="about">
      <div className="container">
        <Row>
          <AboutCol1>
            <img src="/image/image2.jpg" alt="Profile" />
          </AboutCol1>
          <AboutCol2>
            <h1>ABOUT <span>ME</span></h1>
            <p>
              Enthusiastic Computer Science student with skills in web development and leadership, 
              seeking to contribute to innovative projects.
            </p>
            <TabTitles>
              <TabLink 
                active={activeTab === 'EDUCATION'} 
                onClick={() => openTab('EDUCATION')}
              >
                EDUCATION
              </TabLink>
              <TabLink 
                active={activeTab === 'SKILLS'} 
                onClick={() => openTab('SKILLS')}
              >
                SKILLS
              </TabLink>
              <TabLink 
                active={activeTab === 'HOBBIES'} 
                onClick={() => openTab('HOBBIES')}
              >
                HOBBIES
              </TabLink>
            </TabTitles>
            
            <TabContent active={activeTab === 'EDUCATION'}>
              <ul>
                <li><span>SSC : 2019</span><br />BHASHYAM SCHOOL</li>
                <li><span>INTERMEDIATE : 2019-2021</span><br />MODERN JUNIOR COLLEGE</li>
                <li><span>B.TECH : 2021-2025</span><br />ADITYA UNIVERSITY</li>
              </ul>
            </TabContent>
            
            <TabContent active={activeTab === 'SKILLS'}>
              <ul>
                <li>Frontend Developer</li>
                <li><span>Programming Languages</span><br />HTML, CSS, Python, JavaScript, React</li>
                <li><span>Special Skills</span><br />Leadership, Communication, Creativity, Team Management</li>
              </ul>
            </TabContent>
            
            <TabContent active={activeTab === 'HOBBIES'}>
              <ul>
                <li>Social Service Activities</li>
                <li>Painting</li>
                <li>Cooking</li>
              </ul>
            </TabContent>
          </AboutCol2>
        </Row>
      </div>
    </AboutSection>
  );
};

export default About;
