import React, { useState, useEffect, useContext } from "react"
import { api } from "../utils/api";
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile" aria-label="profile">
        <div className="profile__avatar" onClick={props.onEditAvatar}>
          <img
            src={currentUser ? currentUser.avatar : ''}
            alt="Аватар"
            className="profile__avatar-image" />
        </div>
        <div className="profile__info">
          <div className="profile__info-edit">
            <h1 className="profile__title">{currentUser ? currentUser.name : ''}</h1>
            <button
              onClick={props.onEditProfile}
              aria-label="editButton"
              type="button"
              className="profile__button profile__button_edit button" />
          </div>
          <p className="profile__subtitle">{currentUser ? currentUser.about : ''}</p>
        </div>
        <button
          onClick={props.onAddPlace}
          aria-label="addButton"
          type="button"
          className="profile__button profile__button_add button" />
      </section>
      <section className="cards" aria-label="cards">
        {props.cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete} />
        ))}
      </section>
    </main>
  )
}

export default Main
