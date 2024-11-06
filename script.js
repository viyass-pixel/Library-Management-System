class Book {
    constructor(title, author, ISBN, publicationYear) {
        this.title = title;
        this.author = author;
        this.ISBN = ISBN;
        this.publicationYear = publicationYear;
        this.isBorrowed = false;
    }

    borrowBook() {
        if (!this.isBorrowed) {
            this.isBorrowed = true;
            return "Book borrowed successfully.";
        }
        return "Book is already borrowed.";
    }

    returnBook() {
        if (this.isBorrowed) {
            this.isBorrowed = false;
            return "Book returned successfully.";
        }
        return "Book was not borrowed.";
    }

    getDetails() {
        return `${this.title} by ${this.author}, ISBN: ${this.ISBN}, Published: ${this.publicationYear}`;
    }
}

class Member {
    constructor(id, name, email, phone) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
    }
}

class Library {
    constructor() {
        this.books = [];
        this.members = [];
    }

    addBook(book) {
        this.books.push(book);
        return `Book "${book.title}" added to the library.`;
    }

    registerMember(member) {
        this.members.push(member);
        return `Member "${member.name}" registered successfully.`;
    }

    borrowBook(memberId, bookTitle) {
        const member = this.members.find(m => m.id === memberId);
        const book = this.books.find(b => b.title === bookTitle);
        if (member && book) {
            return book.borrowBook();
        }
        return "Member or book not found.";
    }

    returnBook(memberId, bookTitle) {
        const member = this.members.find(m => m.id === memberId);
        const book = this.books.find(b => b.title === bookTitle);
        if (member && book) {
            return book.returnBook();
        }
        return "Member or book not found.";
    }

    listBooks() {
        if (this.books.length === 0) {
            return "No books available.";
        }
        return this.books.map(b => b.getDetails()).join("\n");
    }

    listMembers() {
        if (this.members.length === 0) {
            return "No members registered.";
        }
        return this.members.map(m => `${m.name} (ID: ${m.id})`).join("\n");
    }

    findBook(title) {
        const book = this.books.find(b => b.title === title);
        return book ? book.getDetails() : "Book not found.";
    }

    checkAvailability(title) {
        const book = this.books.find(b => b.title === title);
        if (book) {
            return book.isBorrowed ? "Not available" : "Available";
        }
        return "Book not found.";
    }
}

const library = new Library();

// Utility functions to interact with the DOM

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => section.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';
    document.getElementById('result').innerText = '';
}

function addBook() {
        const title = document.getElementById('bookTitle').value;
        const author = document.getElementById('bookAuthor').value;
        const ISBN = document.getElementById('bookISBN').value;
        const year = document.getElementById('bookYear').value;
        const book = new Book(title, author, ISBN, year);
        const result = library.addBook(book);
        document.getElementById('result').innerText = result;
        clearInputs(['bookTitle', 'bookAuthor', 'bookISBN', 'bookYear']);
    }
    

function registerMember() {
    const memberId = document.getElementById('memberId').value;
    const name = document.getElementById('memberName').value;
    const email = document.getElementById('memberEmail').value;
    const phone = document.getElementById('memberPhone').value;
    const member = new Member(memberId, name, email, phone);
    const result = library.registerMember(member);
    document.getElementById('result').innerText = result;
    clearInputs(['memberId', 'memberName', 'memberEmail', 'memberPhone']);
}

function borrowBook() {
    const memberId = document.getElementById('borrowMemberId').value;
    const bookTitle = document.getElementById('borrowBookTitle').value;
    const result = library.borrowBook(memberId, bookTitle);
    document.getElementById('result').innerText = result;
    clearInputs(['borrowMemberId', 'borrowBookTitle']);
}

function returnBook() {
    const memberId = document.getElementById('returnMemberId').value;
    const bookTitle = document.getElementById('returnBookTitle').value;
    const result = library.returnBook(memberId, bookTitle);
    document.getElementById('result').innerText = result;
    clearInputs(['returnMemberId', 'returnBookTitle']);
}

function listBooks() {
    const result = library.listBooks();
    document.getElementById('result').innerText = result;
}

function listMembers() {
    const result = library.listMembers();
    document.getElementById('result').innerText = result;
}

function findBook() {
    const title = document.getElementById('findBookTitle').value;
    const result = library.findBook(title);
    document.getElementById('result').innerText = result;
    clearInputs(['findBookTitle']);
}

function checkAvailability() {
    const title = document.getElementById('checkBookTitle').value;
    const result = library.checkAvailability(title);
    document.getElementById('result').innerText = result;
    clearInputs(['checkBookTitle']);
}

// Utility function to clear inputs after operations
function clearInputs(ids) {
    ids.forEach(id => document.getElementById(id).value = '');
}

// Initially show Add Book section
showSection('addBookSection');