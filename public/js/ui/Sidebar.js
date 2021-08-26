/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const toggleButton = document.querySelector('.sidebar-toggle');
    const sidebarBody = document.querySelector('.sidebar-mini');
    toggleButton.addEventListener('click', (e) => {
      e.preventDefault();
      sidebarBody.classList.toggle('sidebar-open');
      sidebarBody.classList.toggle('sidebar-collapse');
    })
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const modalRegister = document.querySelector('.menu-item_register');
    const modalLogin = document.querySelector('.menu-item_login');
    const logOut = document.querySelector('.menu-item_logout');

    modalRegister.addEventListener('click', (e) => {
      e.preventDefault();
      App.getModal('register').open();
    });

    modalLogin.addEventListener('click', (e) => {
      e.preventDefault();
      App.getModal('login').open();
    });

    logOut.addEventListener('click', (e) => {
      e.preventDefault();
      User.logout({}, (err, response) => {
        if (response.success = true) {
          App.setState('init');
        }
      });
    });
  }
}