import React, { useState } from 'react';
import styled from 'styled-components';
import { LOGIN_USER } from '../graphql/mutations';
import { useMutation } from '@apollo/client';
import Auth from "../utils/auth";

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  width: 100%;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
`;

const Input = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
 background-color: #4CAF50; 
  color: white; 
  padding: 10px 20px;
  border: none; 
  border-radius: 5px; 
  cursor: pointer; 
  font-size: 16px; 
  margin-top: 1rem;

  &:hover {
    background-color: #45a049; 
  }
`;

const LoginFormModal = ({ show, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { error }] = useMutation(LOGIN_USER);


  const handleLogin = async (event) => {
    event.preventDefault();
    console.log(event)
    // Aquí añadir lógica para el inicio de sesión
    try {
      const loginResponse = await login({
        variables: { email: email, password: password },
      });

      const token = loginResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
      console.log(error)
    }

    console.log('Iniciar sesión con:', email, password);
  };


  if (!show) return null;

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <h2>Iniciar Sesión</h2>
        <Form onSubmit={handleLogin}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Log In</Button>
        </Form>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default LoginFormModal;

