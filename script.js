let btn = document.querySelector('.btn-js');
let tableBody = document.querySelector('.book-list-js');
let bookList = JSON.parse(localStorage.getItem('bookList')) || [];

function loadBookList() {
    tableBody.innerHTML = '';
    bookList.forEach((book) => {
        let html = `
        <tr>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td>
                <button class="button del-btn-js">
                <span class="X"></span>
                <span class="Y"></span>
                <div class="close">Close</div>
                </button>
            </td>
        </tr>
        `;
        tableBody.innerHTML += html;
    });
}
loadBookList();
tableBody.addEventListener('click', (e) => {
    if (e.target.classList.contains('del-btn-js')) {
        e.target.parentElement.parentElement.remove();
        console.log(e)
        let row = e.target.closest('tr');
        let index = row.getAttribute('data-index');
        bookList.splice(index, 1);
        localStorage.setItem('bookList', JSON.stringify(bookList));
        loadBookList();
        console.log(`Book at index ${index} deleted`);
    }
});

btn.addEventListener('click', (e) => {
    e.preventDefault();
    let html = ``;
    let title = document.querySelector('.title-js');
    let author = document.querySelector('.author-js');
    let isbn = document.querySelector('.isbn-js');
    const inputTitle = title.value;
    const inputAuthor = author.value;
    const inputIsbn = isbn.value;
    bookList.push({ title: inputTitle, author: inputAuthor, isbn: inputIsbn });
    localStorage.setItem('bookList', JSON.stringify(bookList));
    if (!inputTitle || !inputAuthor || !inputIsbn) {
        alert('Please fill all fields');
        return;
    }
    html = `
        <tr>
            <td>${inputTitle}</td>
            <td>${inputAuthor}</td>
            <td>${inputIsbn}</td>
            <td>
                <button class="button del-btn-js">
                <span class="X"></span>
                <span class="Y"></span>
                <div class="close">Close</div>
                </button>
            </td>
        </tr>
        `;
    document.querySelector('.book-list-js').innerHTML += html;
    title.value = '';
    author.value = '';
    isbn.value = '';
});