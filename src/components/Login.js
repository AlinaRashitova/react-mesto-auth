import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as auth from '../utils/auth';

function Login({ handleLogin }) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const history = useHistory();

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!data.email || !data.password) {
      return;
    }
    auth.authorize(data.email, data.password)
      .then((res) => {
        if (res.jwt) {
          setData({ email: '', password: '' })
          localStorage.setItem('jwt', res.jwt)
          const userData = {
            email: res.user.email,
            password: res.user.password,
          }
          handleLogin(userData);
          history.push("/");
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <section className="login">
      <p className="login__title">Вход</p>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          required
          className="login__input"
          type="email"
          placeholder="Email"
          id="email"
          name="email"
          value={data.email}
          onChange={handleChange}
        />
        <input
          required
          className="login__input"
          type="password"
          placeholder="Пароль"
          id="password"
          name="password"
          value={data.password}
          onChange={handleChange}
        />
        <button type="submit" className="login__button button">Войти</button>
      </form>
    </section>
  )
}

export default Login;
