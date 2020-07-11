import styled from 'styled-components';

import { Phone } from 'styled-icons/material';
import { MailOutline } from 'styled-icons/material-outlined'


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 60vh;
  width: 70vw;
`;

export const TopWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const Logo = styled.img`
  width: 400px;
  border-radius: 8px;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 220px;
  justify-content: space-around;
`;

export const Info = styled.div`
  display: flex;
  align-items: center;

  > strong {
    color: #121212;
    font-size: 16px;
    font-family: 'Inter';
    font-weight: 200;
    
  }

  > span {
    
    font-family: 'Inter';
    font-weight: 400;
    margin-left: 5px;
  }

`;

export const ContactContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;



export const Contact = styled.div`
  display: flex;
  align-items: center;
  
  background-color: #78C8CE;
  border-radius: 8px;
  padding: 8px 16px;
`;

export const ContactInfo = styled.div`
  color: #FFF;

  > span {
    margin-left: 9px;
    font-size:18px;
  }
`;

export const EmailIcon = styled(MailOutline)`
  width: 28px;
  height: 28px;
  color: #FFF;
  margin-right: 12px;

`;

export const PhoneIcon = styled(Phone)`
  width: 28px;
  height: 28px;
  color: #FFF;
  margin-right: 12px;
`;
