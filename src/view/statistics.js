import AbstractView from "./abstract.js";

const createStatisticsTemplate = (quantity) => {
  return (
    `<section class="footer__statistics">
      <p>${quantity} movies inside</p>
    </section>`
  );
};
export default class Statistics extends AbstractView {
  constructor(quantity) {
    super();
    this._quantity = quantity;
  }

  getTemplate() {
    return createStatisticsTemplate(this._quantity);
  }
}
