
class CardList {
  constructor(container, initial, createCard) {
    this.container = container;
    this.initial = initial;
    this.createCard = createCard;
  }


  addCard(card) {
    this.container.append(card);
  }

  render() {
    this.initial.forEach((card) => {
      this.addCard(this.createCard(card));
    });
  }
}
