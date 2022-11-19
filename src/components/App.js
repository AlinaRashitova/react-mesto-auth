import { useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleDeleteCardClick() {
    setIsConfirmationPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <div className="page">
      <div className="page__container">
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onDeleteClick={handleDeleteCardClick} />
        <Footer />
        <PopupWithForm
          name="edit"
          title="Редактировать профиль"
          button="Сохранить"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}>
          <label className="popup__label">
            <input
              type="text"
              name="nameInput"
              id="nameInput"
              placeholder="Имя"
              className="popup__input popup__input_type_name"
              required
              minLength="2"
              maxLength="40" />
            <span id="nameInput-error" className="error" />
          </label>
          <label className="popup__label">
            <input
              type="text"
              name="jobInput"
              id="jobInput"
              placeholder="О себе"
              className="popup__input popup__input_type_job"
              required
              minLength="2"
              maxLength="200" />
            <span id="jobInput-error" className="error" />
          </label>
        </PopupWithForm>
        <PopupWithForm
          name="add"
          title="Новое место"
          button="Сохранить"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}>
          <label className="popup__label">
            <input
              type="text"
              name="name"
              id="placeNameInput"
              placeholder="Название"
              className="popup__input popup__input_type_place-name"
              required
              minLength="2"
              maxLength="30" />
            <span id="placeNameInput-error" className="error" />
          </label>
          <label className="popup__label">
            <input
              type="url"
              name="link"
              id="imageSourceInput"
              placeholder="Ссылка на картинку"
              className="popup__input popup__input_type_image-source"
              required />
            <span id="imageSourceInput-error" className="error" />
          </label>
        </PopupWithForm>
        <PopupWithForm
          name="change-avatar"
          title="Обновить аватар"
          button="Сохранить"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}>
          <label className="popup__label">
            <input
              type="url"
              name="link"
              id="avatarSourceInput"
              placeholder="Ссылка на аватар"
              className="popup__input popup__input_type_avatar-source"
              required />
            <span id="avatarSourceInput-error" className="error" />
          </label>
        </PopupWithForm>
        <PopupWithForm
          name="confirm"
          title="Вы уверены?"
          button="Да"
          isOpen={isConfirmationPopupOpen}
          onClose={closeAllPopups} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </div>
  );
}

export default App;
