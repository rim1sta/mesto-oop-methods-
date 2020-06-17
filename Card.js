class Card {
  constructor(item, openCallback) {
    this.item = item;
    this.openCallback = openCallback;
    this.card = null;
    this.imageOpening = this.imageOpening.bind(this);
    this.remove = this.remove.bind(this);
  }

  like() {
    this.classList.toggle("place-card__like-icon_liked");
  }

  remove() {
    this.removeEventListeners();
    this.card.remove();
  }

  getTemplate() {
    const templateString = `<div class="place-card">
        <div class="place-card__image" data-url="">
          <button class="place-card__delete-icon"></button>
        </div>
        <div class="place-card__description">
          <h3 class="place-card__name"></h3>
          <button class="place-card__like-icon"></button>
        </div>
        </div>`;
    const element = document.createElement("div");
    element.insertAdjacentHTML("beforeend", templateString.trim());
    return element.firstChild;
  }

  create() {
    this.card = this.getTemplate();
    this.image = this.card.querySelector(".place-card__image");
    this.likeButton = this.card.querySelector(".place-card__like-icon");
    this.removeButton = this.card.querySelector(".place-card__delete-icon");
    this.card.querySelector(".place-card__name").textContent = this.item.name;
    this.image.style.backgroundImage = `url(${this.item.link})`;
    this.setEventListeners();
    return this.card;
  }

  /** Можно лучше:
   * 
   * Вынести реализацию открытия попапа с большим изображением из класса Card. 
   * 
   * Например, можно создать класс PopupImage, который будет отвечать за все, что касается попапа с большой картинкой.
   * Можно реализовать наследование данного класса от класса Popup, это будет отличной практикой. 
   * 
   * Подробнее про наследование в JS: https://habr.com/ru/company/ruvds/blog/415377/
   */
  imageOpening(evt) {
    if (evt.target.classList.contains("place-card__image")) {
      this.openCallback(this.item.link);
    }
  }

  setEventListeners() {
    this.likeButton.addEventListener("click", this.like);
    this.removeButton.addEventListener("click", this.remove);
    this.image.addEventListener("click", this.imageOpening);
  }

  removeEventListeners() {
    this.likeButton.removeEventListener("click", this.like);
    this.removeButton.removeEventListener("click", this.remove);
    this.image.removeEventListener("click", this.imageOpening);
  }
}
