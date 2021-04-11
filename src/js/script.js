{
  'use strict';

  class BooksList {
    constructor(data) {
      const thisBooksList = this;
      thisBooksList.data = data;

      thisBooksList.getElements();
      thisBooksList.initActions();
      thisBooksList.render(data);
    }

    getElements() {
      const thisBooksList = this;

      thisBooksList.dom = {};
      thisBooksList.select = {
        templateOf: {
          bookTpl: '#template-book'
        },
        bookCovers: '.book__image',
        dataId: 'data-id',
        filters: '.filters',
        listOfBooks: '.books-list',
      };

      thisBooksList.dom.booksListWrapper = document.querySelector(thisBooksList.select.listOfBooks);
      thisBooksList.dom.filtersForm = document.querySelector(thisBooksList.select.filters);

    }

    render(data) {
      const thisBooksList = this;
      const tplWrapper = thisBooksList.select.templateOf.bookTpl;
      const tplSelector = document.querySelector(tplWrapper);

      thisBooksList.templates = {
        book: Handlebars.compile(tplSelector.innerHTML),
      };

      for (const book of data) {
        const width = 'width: ' + book.rating * 10 + '%;';
        if (book.rating <= 6) {
          book.ratingBarStyle = 'background: linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';
        } else if (book.rating > 6 && book.rating <= 8) {
          book.ratingBarStyle = 'background: linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
        } else if (book.rating > 8 && book.rating <= 9) {
          book.ratingBarStyle = 'background: linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
        } else {
          book.ratingBarStyle = 'background: linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
        }

        book.ratingBarStyle += width;
        const generatedHTML = thisBooksList.templates.book(book);
        const element = utils.createDOMFromHTML(generatedHTML);
        thisBooksList.dom.booksListWrapper.appendChild(element);
      }

    }

    filterBooks(filters) {
      const thisBooksList = this;

      const allCovers = thisBooksList.dom.booksListWrapper.querySelectorAll(thisBooksList.select.bookCovers);
      for (const cover of allCovers) {
        cover.classList.remove('hidden');
      }
      for (const book of thisBooksList.data) {
        let shouldBeHidden = false;
        for (const filter of filters) {
          if (!book.details[filter]) {
            shouldBeHidden = true;
            break;
          }
        }
        if (shouldBeHidden) {
          const bookCoverToHide = thisBooksList.dom.booksListWrapper.querySelector('.book__image[data-id = "' + book.id + '"]');
          bookCoverToHide.classList.add('hidden');
        }
      }
    }

    initActions() {
      const thisBooksList = this;
      const filters = [];
      thisBooksList.favoriteBooks = [];
      thisBooksList.dom.booksListWrapper.addEventListener('dblclick', function(event) {
        event.preventDefault();

        if (event.target && event.target.nodeName == 'IMG') {
          const element = event.target.parentNode.parentNode;
          const bookId = element.getAttribute(thisBooksList.select.dataId);
          if (thisBooksList.favoriteBooks.indexOf(bookId) == -1) {
            thisBooksList.favoriteBooks.push(bookId);
            element.classList.add('favorite');
          } else {
            thisBooksList.favoriteBooks.splice(thisBooksList.favoriteBooks.indexOf(bookId), 1);
            element.classList.remove('favorite');
          }
        }
      });

      thisBooksList.dom.filtersForm.addEventListener('click', function(event) {

        if (event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter') {
          if (event.target.checked) {
            filters.push(event.target.value);
            thisBooksList.filterBooks(filters);
          } else {
            filters.splice(filters.indexOf(event.target.value), 1);
            thisBooksList.filterBooks(filters);
          }
        }
      });

    }
  }

  new BooksList(dataSource.books);


}