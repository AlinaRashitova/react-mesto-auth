import { useState, useEffect } from 'react';
import { Switch, Route, Redirect, Routes } from 'react-router-dom';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from './ImagePopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth';

function App() {
  const [cards, setCards] = useState([]);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [isOpenInfoTooltip, setisOpenInfoTooltip] = useState(false);

  useEffect(() => {
    api
      .getInitialCards()
      .then(cards => setCards(cards))
      .catch(err => console.log(`${err}`))
  }, [])

  useEffect(() => {
    api
      .getUserInfo()
      .then(user => setCurrentUser(user))
      .catch(err => console.log(`${err}`))
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      auth.checkToken(token)
      .then((res) => {
        if (res) {
          setEmail(res.data.email);
          handleLogin();
        }
      })
      .catch(err => console.log(`${err}`))
      .finally(() => history.push('/'));
    }
  }, [loggedIn, email, history])

  const handleLogin = () => {
    setLoggedIn(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleInfoTooltipClick() {
    setisOpenInfoTooltip(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setisOpenInfoTooltip(false);
    setSelectedCard(null);
  }

  function closeOnOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
      closeAllPopups();
    }
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (isLiked) {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => (
            c._id === card._id ? newCard : c
          )));
        })
        .catch(err => console.log(`${err}`))
    } else {
      api
        .putLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => (
            c._id === card._id ? newCard : c
          )));
        })
        .catch(err => console.log(`${err}`))
    }
  }

  function handleCardDelete(card) {
    setIsLoading(true);
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards => cards.filter(c => c._id !== card._id))
        closeAllPopups()
      })
      .catch(err => console.log(`${err}`))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateUser(user) {
    setIsLoading(true);
    api.editProfile(user)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups();
      })
      .catch(err => console.log(`${err}`))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(avatar) {
    setIsLoading(true);
    api.changeAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(`${err}`))
      .finally(() => setIsLoading(false));
  }

  function handleAddPlaceSubmit(card) {
    setIsLoading(true);
    api.addCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(`${err}`))
      .finally(() => setIsLoading(false));
  }

  return (
    <div className="page">
      <div className="page__container">
        <CurrentUserContext.Provider value={currentUser}>
          <Header />
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              component={Main}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardDelete={handleCardDelete}
              onCardLike={handleCardLike}
              cards={cards}
            >
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </ProtectedRoute>
            <Route path="/sign-up">
              <Register />
            </Route>
            <Route path="/sign-in">
              <Login />
            </Route>
          </Switch>
          {loggedIn && <Footer />}
          <EditProfilePopup
            isLoading={isLoading}
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onOverlayClose={closeOnOverlayClick}
            onUpdateUser={handleUpdateUser} />
          <EditAvatarPopup
            isLoading={isLoading}
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onOverlayClose={closeOnOverlayClick}
            onUpdateAvatar={handleUpdateAvatar} />
          <AddPlacePopup
            isLoading={isLoading}
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            onOverlayClose={closeOnOverlayClick} />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
            onOverlay={closeOnOverlayClick} />
          <InfoTooltip
            onClose={closeAllPopups}
            isOpen={isOpenInfoTooltip} />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
