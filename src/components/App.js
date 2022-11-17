import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import Card from './Card';
import { useState } from 'react';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
  }

  function closeOnOverlayClick(evt) {
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__button_close')) {
      closeAllPopups();
    }
  }

  return (
    <div className="page">
      <div className="page__container">
        <Header />
        <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} />
        <Footer />
        <PopupWithForm name="editProfile" title="Редактировать профиль" button="Сохранить" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onOverlay={closeOnOverlayClick}>
          <label className="popup__label">
            <input type="text" name="nameInput" id="nameInput" placeholder="Имя"
              className="popup__input popup__input_type_name" required minLength="2" maxLength="40" />
            <span id="nameInput-error" className="error"></span>
          </label>
          <label className="popup__label">
            <input type="text" name="jobInput" id="jobInput" placeholder="О себе"
              className="popup__input popup__input_type_job" required minLength="2" maxLength="200" />
            <span id="jobInput-error" className="error"></span>
          </label>
        </PopupWithForm>
        <PopupWithForm name="addPlace" title="Новое место" button="Сохранить" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onOverlay={closeOnOverlayClick}>
          <label className="popup__label">
            <input type="text" name="name" id="placeNameInput" placeholder="Название"
              className="popup__input popup__input_type_place-name" required minLength="2" maxLength="30" />
            <span id="placeNameInput-error" className="error"></span>
          </label>
          <label className="popup__label">
            <input type="url" name="link" id="imageSourceInput" placeholder="Ссылка на картинку"
              className="popup__input popup__input_type_image-source" required />
            <span id="imageSourceInput-error" className="error"></span>
          </label>
        </PopupWithForm>
        <PopupWithForm name="changeAvatar" title="Обновить аватар" button="Сохранить" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onOverlay={closeOnOverlayClick}>
          <label className="popup__label">
            <input type="url" name="link" id="avatarSourceInput" placeholder="Ссылка на аватар"
              className="popup__input popup__input_type_avatar-source" required />
            <span id="avatarSourceInput-error" className="error"></span>
          </label>
        </PopupWithForm>
      </div>

      <section className="popup popup_type_photo" aria-label="popup">
        <div className="popup__container popup__container_photo">
          <button aria-label="closeButton" type="button" className="popup__button popup__button_close button"></button>
          <figure className="popup__figure">
            <img src="#" alt="Картинка" className="popup__image" />
            <figcaption className="popup__caption"></figcaption>
          </figure>
        </div>
      </section>

      <section className="popup popup_type_confirm">
        <div className="popup__container">
          <button
            aria-label="closeButton"
            type="button"
            className="popup__button popup__button_close button">
          </button>
          <h2 className="popup__title">Вы уверены?</h2>
          <button type="button" className="popup__button popup__button_save">Да</button>
        </div>
      </section>
    </div>
  );
}

export default App;
