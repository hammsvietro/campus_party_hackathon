import React, { createContext, useContext, useState, useEffect } from 'react';

import api from '../../services/api';

const AuthContext = createContext({ entity: {}, isSigned: false, token: '', signIn: {}, signOut: {}, checkLocalStorage: {}, isEstablishment: false, hasFood: false });


export const AuthProvider = ({ children }) => {

  const [entity, setEntity] = useState({});
  const [token, setToken] = useState('');
  const [isEstablishment, setIsEstablishment] = useState(false);
  const [hasFood, setHasFood] = useState(false);

  const signIn = async (email, password) => {
    console.log(email, password);
    let response;
    try {
      response = await api.put('/session/login', { email, password });
        console.log('200');
        setEntity(response.data.entity);
        setToken(response.data.token);
        setIsEstablishment(response.data.entity.isEstablishment);
        setHasFood(response.data.entity.has_meal === 0 ? false : true);
        api.defaults.headers.authorization = `Bearer ${response.data.token}`;
        localStorage.setItem('entity', JSON.stringify(response.data.entity));
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('isEstablishment', response.data.entity.isEstablishment);
        localStorage.setItem('hasFood', response.data.entity.has_meal === 0 ? false : true);


    } catch (err) {
      alert('usuario/senha inválidos');
      console.log(err);
      
      return false;
    }
    return true;
  };

  const signOut = () => {
    setEntity({}); 
    localStorage.clear();
    api.defaults.headers.authorization = '';
  };

  const checkLocalStorage = () => {
    let checkEntity = localStorage.getItem('entity');
    const checkToken = localStorage.getItem('token');
    
    
    if (!checkEntity || !checkToken) return setEntity({});
    
    checkEntity = JSON.parse(checkEntity);

    setEntity(checkEntity);
    setToken(checkToken);
    api.defaults.headers.authorization = `Bearer ${checkToken}`;
    
    return Boolean(entity);
  };

  useEffect(() => {
    checkLocalStorage();
  }, []);
  
  return (
    
    <AuthContext.Provider value={{ entity, token, isSigned: Object.keys(entity).length !== 0, signIn, signOut, checkLocalStorage, isEstablishment, hasFood }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};