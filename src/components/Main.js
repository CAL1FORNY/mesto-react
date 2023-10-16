import React, { useEffect, useState } from "react";
import api from "../utils/Api";
import Card from "./Card";

function Main(props) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then(([userData, initialCards]) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(`Возникла глобальная ошибка, ${err}`);
      });
  }, []);

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-area">
          <img src={userAvatar} className="profile__avatar" alt="Аватар" />
          <button
            type="button"
            className="profile__avatar-edit"
            aria-label="Редактировать аватар"
            onClick={props.onEditAvatar}
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button
            type="button"
            className="profile__edit"
            aria-label="Редактировать профиль"
            onClick={props.onEditProfile}
          />
          <p className="profile__description">{userDescription}</p>
        </div>
        <button
          type="button"
          className="profile__add"
          aria-label="Добавить место"
          onClick={props.onAddPlace}
        />
      </section>
      <section className="cards">
        {cards.map((cardItem) => (
          <Card
            key={cardItem._id}
            link={cardItem.link}
            name={cardItem.name}
            likeCount={cardItem.likes.length}
            onCardClick={props.onCardClick}
            onCardDelete={props.onCardDelete}
            card={cardItem}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
