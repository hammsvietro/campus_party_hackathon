import React from 'react';

import { Container, Logo, TopWrapper, InfoContainer, Info, ContactContainer, Contact, ContactInfo, EmailIcon, PhoneIcon } from './styles';
import ovo from '../../assets/ovo.jpeg';


const ModalBody = ({data}) => {
  return (
    <Container>
      <TopWrapper>
        <Logo src={data.logo} alt="logo"></Logo>
        <InfoContainer>
          <Info>
            <strong>CNPJ:</strong>
            <span>{data.cnpj}</span>
          </Info>
          <Info>
            <strong>Endereço:</strong>
            <span>{`${data.street} - ${data.number}`}</span>
          </Info>
          <Info>
            <strong>UF:</strong>
            <span>{data.state}</span>
          </Info>
          <Info>
            <strong>Cidade:</strong>
            <span>{data.city}</span>
          </Info>

          {data.isEstablishment && (data.has_meal == '1' ?
           <>
            <Info>
              <strong>Refeições:</strong>
              <span>{data.available_meals}</span>
            </Info>
            <Info>
              <strong>Disponível para coleta até:</strong>
              <span>{data.time_available}</span>
            </Info>
          </>
            :
          <>
            <Info>
              <strong>No momento esse estabelecimento não está doando</strong>
            </Info>
          </>
          )}
        </InfoContainer>
      </TopWrapper>
      
        <ContactContainer>
          <Contact>
            <EmailIcon />
            <ContactInfo>
              <strong>Email:</strong>
              <span>{data.email}</span>
            </ContactInfo>
          </Contact>
          <Contact>
            <PhoneIcon />
            <ContactInfo>
              <strong>Telefone:</strong>
              <span>{data.phone_number}</span>
            </ContactInfo>
          </Contact>

        </ContactContainer>
    </Container>
  );
}

export default ModalBody;
