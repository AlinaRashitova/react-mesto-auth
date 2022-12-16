import React, { useState } from "react";
import { useHistory, Link } from 'react-router-dom';
import * as auth from '../utils/auth';

function Register() {
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
    auth.register(data.email.toLowerCase(), data.password)
      .then((res) => {
        if (res.statusCode !== 400) {
          setData({
            ...data,
            message: "",
          });
          history.push("/sign-in");
        } else {
          setData({
            ...data,
            message: "Что-то пошло не так!",
          });
        }
      })
      .catch(err => console.log(`${err}`));
  }

  return (
    <section className="register">
      <p className="register__title">Регистрация</p>
      <form className="register__form" onSubmit={handleSubmit}>
        <input
          className="register__input"
          required
          type="email"
          placeholder="Email"
          id="email"
          name="email"
          value={data.email}
          onChange={handleChange}
        />
        <input
          required
          className="register__input"
          type="password"
          placeholder="Пароль"
          id="password"
          name="password"
          value={data.password}
          onChange={handleChange}
        />
        <button type="submit" className="register__button button">Зарегистрироваться</button>
      </form>
      <p className="register__signin">Уже зарегистрированы?
        <Link to="sign-in" className="register__login-link"> Войти</Link>
      </p>
    </section>
  )
}

export default Register;
