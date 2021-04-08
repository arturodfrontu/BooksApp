'use strict';

const selector = {
  bookWrapper: {
    booksList: '.books-list',
  },
  listOfBooksTemplate: {
    listOfBooks: '#template-book',
  },
};

const bookListTemplate = document.querySelector(selector.listOfBooksTemplate.listOfBooks);
const bookListWrapper = document.querySelector(selector.bookWrapper.booksList);

const templates = {
  booksList: Handlebars.compile(bookListTemplate.innerHTML),
};

const render = ()=> {
  for (let book of dataSource.books) {
    const generatedHTML = templates.booksList(book);
    const element = utils.createDOMFromHTML(generatedHTML);
    bookListWrapper.appendChild(element);
  }
};

render();