/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const accList = document.querySelectorAll('.accounts-select');

    Account.list(User.current(), (err, response) => {
      for (let item of accList) {
        item.innerHTML = '';
      }

      if (response) {
        response.data.forEach(element => {
          let account = `<option value="${element.id}">${element.name}</options>`;
          for (let elem of accList) {
            elem.insertAdjacentHTML('beforeEnd', account);
          }
        });
      }
    })
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(options) {
    const modal = this.element.closest('.modal').dataset.modalId;
    Transaction.create(options, (err, response) => {
      if (response) {
        if(modal === 'newIncome'){
          App.getModal('newIncome').close();
        } else {
          App.getModal('newExpense').close();
        }
        this.element.reset();
        App.update();
      }
    });
  }
}