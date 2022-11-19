function Card({ card, onCardClick, onDeleteClick }) {
  function handleClick() {
    onCardClick(card);
  }

  return (
    <article className="card">
      <button
        aria-label="deleteButton"
        type="button"
        className="card__button card__button_delete button"
        onClick={onDeleteClick}>
      </button>
      <img src={card.link} alt={card.name} className="card__image" onClick={handleClick} />
      <div className="card__info">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like">
          <button
            aria-label="likeButton"
            type="button"
            className="card__button card__button_like" />
          <span className="card__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </article>
  )
}

export default Card
