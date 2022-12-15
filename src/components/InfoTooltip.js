import success from '../images/success.png';
import unsuccess from '../images/unsuccess.png';

function InfoTooltip(props) {
  return (
    <section className={`popup popup_type_${props.name}${props.isOpenInfoTooltip ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button
          aria-label="closeButton"
          type="button"
          className="popup__button popup__button_close button"
          onClick={props.onClose}
        />
        <div className="popup__info-status">
          <img
            className="popup__info-image"
            src={props.isRequestStatus ? success : unsuccess}
            alt={props.isRequestStatus ? 'Успешно' : 'Попробуйте еще раз'}
          />
          <h2 className="popup__title popup__title-status">
            {props.isRequestStatus
              ? 'Вы успешно зарегистрировались!'
              : 'Что-то пошло не так! Попробуйте еще раз.'}
          </h2>
        </div>
      </div>

    </section>
  )
}

export default InfoTooltip;
