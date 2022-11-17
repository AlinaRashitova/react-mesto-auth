import { useState } from "react"

function Main(props) {
  const [userName, setUserName] = useState('');
  const [userDescription, setuserDescription] = useState('');
  const [userAvatar, setuserAvatar] = useState('');

  return (
    <main>
      <section className="profile" aria-label="profile">
        <div className="profile__avatar" onClick={props.onEditAvatar}>
          <img src={userAvatar} alt="Аватар" className="profile__avatar-image" />
        </div>
        <div className="profile__info">
          <div className="profile__info-edit">
            <h1 className="profile__title">{userName}</h1>
            <button
              onClick={props.onEditProfile}
              aria-label="editButton"
              type="button"
              className="profile__button profile__button_edit button">
            </button>
          </div>
          <p className="profile__subtitle">{userDescription}</p>
        </div>
        <button
          onClick={props.onAddPlace}
          aria-label="addButton"
          type="button"
          className="profile__button profile__button_add button">
        </button>
      </section>
      <section className="cards" aria-label="cards"></section>
    </main>
  )
}

export default Main
