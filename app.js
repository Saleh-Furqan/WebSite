/////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// SIDEBAR BUTTONS //////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
const btns = document.querySelectorAll(".btnS");
const home = document.querySelector(".home");
const bookList = document.querySelector(".booklist");
const toDoList = document.querySelector(".todolist");
const notesApp = document.querySelector(".notesapp");
const games = document.querySelector(".games");
const etchASketch = document.querySelector(".etchasketch");
const displays = document.querySelectorAll(".display");

function clearDisplay() {
	displays.forEach((d) => {
		d.style.display = "none";
	});
}
clearDisplay();
home.style.display = "";
function clearBtnClass() {
	btns.forEach((btn) => {
		btn.classList.remove("activeSidebarBtn");
	});
}
function clearAllSidebarAction() {
	clearDisplay();
	clearBtnClass();
}

btns.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		if (e.target.classList.contains("hm")) {
			clearAllSidebarAction();
			home.style.display = "";
		} else if (e.target.classList.contains("book")) {
			clearAllSidebarAction();
			bookList.style.display = "";
		} else if (e.target.classList.contains("list")) {
			clearAllSidebarAction();
			toDoList.style.display = "";
		} else if (e.target.classList.contains("notes")) {
			clearAllSidebarAction();
			notesApp.style.display = "";
		} else if (e.target.classList.contains("draw")) {
			clearAllSidebarAction();
			etchASketch.style.display = "";
		} else if (e.target.classList.contains("play")) {
			clearAllSidebarAction();
			games.style.display = "";
		}
		e.target.classList.add("activeSidebarBtn");
	});
});
/////////////////////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------------------//
night = document.querySelector(".night");
day = document.querySelector(".day");
day.addEventListener("click", () => {
	document.documentElement.setAttribute("data-theme", "light");
	day.style.display = "none";
	night.style.display = "flex";
});
night.addEventListener("click", () => {
	document.documentElement.setAttribute("data-theme", "dark");
	night.style.display = "none";
	day.style.display = "flex";
});

const left = document.querySelector(".left");
const menu = document.querySelector(".menu");
const menu2 = document.querySelector(".menu2");
menu.addEventListener("click", () => {
	left.classList.remove("left2");
	menu.style.display = "none";
	menu2.style.display = "flex";
});
document.addEventListener("click", (e) => {
	if (
		!e.target.classList.contains("menu") ||
		e.target.classList.contains("menu2")
	) {
		left.classList.add("left2");
		menu.style.display = "";
		menu2.style.display = "";
	}
});

/////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////// ETCH-A-SKETCH /////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
let color = "black";
let click = true;

function populateBoard(size) {
	let board = document.querySelector(".board");
	let squares = board.querySelectorAll("div");
	squares.forEach((div) => {
		div.remove();
	});
	board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
	board.style.gridTemplateRows = `repeat(${size}, 1fr)`;

	let squareCount = size * size;
	for (let i = 0; i < squareCount; i++) {
		let square = document.createElement("div");
		square.style.backgroundColor = "white";
		square.addEventListener("mouseover", colorSquare);
		board.insertAdjacentElement("beforeend", square);
	}
}
function changeSize(i) {
	if (i >= 2 || i <= 100) {
		populateBoard(i);
	} else {
		console.log("error");
	}
}
function colorSquare() {
	if (click) {
		if (color == "random") {
			this.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
		} else {
			this.style.backgroundColor = color;
		}
	}
}
function changeColor(c) {
	color = c;
}

function resetBoard() {
	let board = document.querySelector(".board");
	let squares = board.querySelectorAll("div");
	squares.forEach((div) => {
		div.style.backgroundColor = "white";
	});
}
document.querySelector("body").addEventListener("click", (e) => {
	if (e.target.tagName != "BUTTON") {
		click = !click;
		if (click) {
			document.querySelector(".emode").textContent = "Mode: Coloring...";
		} else {
			document.querySelector(".emode").textContent = "Mode: Not Coloring...";
		}
	}
});
populateBoard(32);
/////////////////////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------------------//

/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////// NOTES APP ///////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
const title = document.getElementById("title2");

const submitNote = document.querySelector(".submitNote");
const desc = document.getElementById("desc");
const form2 = document.querySelector("[data-forms]");
form2.addEventListener("submit", (e) => {
	e.preventDefault();
	desc.value = "";
	addNotes();
});

let notesElem = document.querySelector(".notes2");

let notes = JSON.parse(localStorage.getItem("notes"));
if (notes) {
	notes.forEach((element) => {
		addNotes(element);
	});
}

submitNote.addEventListener("click", (e) => {
	e.preventDefault();
	console.log("hello");
	addNotes();
	desc.value = "";
});

function addNotes(obj) {
	let card = document.createElement("div");
	card.classList.add("card");
	let titleVal = title.value;
	let descVal = desc.value;
	if (obj) {
		titleVal = obj.title;
		descVal = obj.desc;
	}
	card.classList.add("card");

	if (titleVal) {
		card.innerHTML = `<h3>${titleVal}</h3>
      <p class="ptag">${descVal}</p>
      <button class="del">Delete</button>`;
		notesElem.appendChild(card);
		update();
	}
	let clear = card.querySelector(".del");
	clear.addEventListener("click", () => {
		card.remove();
		update();
	});
}

function update() {
	let card = document.querySelectorAll(".card");
	let arr = [];
	card.forEach((element) => {
		arr.push({
			title: element.children[0].innerText,
			desc: element.children[1].innerText,
		});
	});
	localStorage.setItem("notes", JSON.stringify(arr));
}

/////////////////////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------------------//

/////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////// BOOKLIST /////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

const Book = (name, author, pages, read, isbn) => {
	return { name, author, pages, read, isbn };
};

let books;
const getBooks = () => {
	if (localStorage.getItem("books") === null) {
		books = [];
	} else {
		books = JSON.parse(localStorage.getItem("books"));
	}
	return books;
};
const addBooks = (book) => {
	const list = document.querySelector(".bookList");
	const row = document.createElement("tr");
	row.innerHTML = `
    <td>${book.name}</td>
    <td class="bookAuthor">${book.author}</td>
    <td class="bookPages">${book.pages}</td>
    <td class="bookRead">${book.read}</td>
    <td>${book.isbn}</td>
    <td><button class="deleteRow"">X</button></td>
    `;
	list.appendChild(row);
};
const displayBooks = () => {
	let books = getBooks();
	books.forEach((book) => {
		addBooks(book);
	});
};
displayBooks();

const clearFields = () => {
	document.querySelector(".name").value = "";
	document.querySelector(".author").value = "";
	document.querySelector(".pages").value = "";
	document.querySelectorAll(".read").value = "";
	document.querySelector(".isbn").value = "";
};
const saveBook = (book) => {
	books.push(book);
	localStorage.setItem("books", JSON.stringify(books));
};
const deleteBook = (e) => {
	if (e.classList.contains("deleteRow")) {
		e.parentElement.parentElement.remove();
	}
};
function removeBook(isbn) {
	const books = getBooks();

	books.forEach((book, index) => {
		if (book.isbn === isbn) {
			books.splice(index, 1);
		}
	});

	localStorage.setItem("books", JSON.stringify(books));
}
document.querySelector("[data-form]").addEventListener("submit", (e) => {
	e.preventDefault();

	const name = document.querySelector(".name").value;
	const author = document.querySelector(".author").value;
	const pages = document.querySelector(".pages").value;
	const read = validRead();
	const isbn = document.querySelector(".isbn").value;

	function validRead() {
		let read;
		if (
			!document.querySelector("#read").checked &&
			!document.querySelector("#notread").checked
		) {
			return;
		} else if (
			document.querySelector("#read").checked &&
			!document.querySelector("#notread").checked
		) {
			read = "yes";
			return read;
		} else if (
			document.querySelector("#notread").checked &&
			!document.querySelector("#read").checked
		) {
			read = "no";
			return read;
		}
	}

	if (name === "" || author === "" || pages === "" || isbn === "") {
		return;
	} else {
		const book = Book(name, author, pages, read, isbn);
		addBooks(book);
		saveBook(book);
		clearFields();
	}
});

document.querySelector(".bookList").addEventListener("click", (e) => {
	deleteBook(e.target);

	removeBook(e.target.parentElement.previousElementSibling.textContent);
});

/////////////////////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------------------//

/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////// TODO lIST ///////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
const listsContainer = document.querySelector("[data-lists]");
const newListForm = document.querySelector("[data-NewListForm]");
const newListInput = document.querySelector("[data-NewListInput]");
const deleteListButton = document.querySelector("[data-DeleteListButton]");
const listDisplayContainer = document.querySelector(
	"[data-ListDisplayContainer]"
);

const listTitleElement = document.querySelector("[data-ListTitle]");
const listCountElement = document.querySelector("[data-ListCount]");
const tasksContainer = document.querySelector("[data-Tasks]");
const taskTemplate = document.getElementById("task-template");
const newTaskForm = document.querySelector("[data-NewTaskForm]");
const newTaskInput = document.querySelector("[data-NewTaskInput]");
const clearCompletedTasksButton = document.querySelector(
	"[data-ClearCompletedTasksButton]"
);

const LOCAL_STORAGE_LIST_KEY = "task.lists";
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = "task.selectedListId";
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);
/////////////////////////////////////////////////////////////////////////////

function createList(name) {
	return { id: Date.now().toString(), name: name, tasks: [] };
}
function createTask(name) {
	return { id: Date.now().toString(), name: name, complete: false };
}

function save() {
	localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
	localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId);
}

function saveAndRender() {
	save();
	render();
}

function render() {
	clearElement(listsContainer);
	renderLists();

	const selectedList = lists.find((list) => list.id === selectedListId);
	if (selectedListId == null) {
		listDisplayContainer.style.display = "none";
	} else {
		listDisplayContainer.style.display = "";
		listTitleElement.innerText = selectedList.name;
		renderTaskCount(selectedList);
		clearElement(tasksContainer);
		renderTasks(selectedList);
	}
}

////////////////////////// CREATE AND DELETE LISTS ///////////////////////////
newListForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const listName = newListInput.value;
	if (listName == null || listName === "") return;
	const list = createList(listName);
	newListInput.value = null;
	lists.push(list);
	console.log(lists);
	saveAndRender();
});
deleteListButton.addEventListener("click", () => {
	lists = lists.filter((list) => list.id !== selectedListId);
	selectedListId = null;
	saveAndRender();
});

/////////////////////////////////// RENDER LISTS //////////////////////////////////
function renderLists() {
	lists.forEach((list) => {
		const listEl = document.createElement("li");
		listEl.dataset.listId = list.id;
		listEl.classList.add("list-name");
		listEl.innerText = list.name;
		if (list.id === selectedListId) {
			listEl.classList.add("active-list");
		}
		listsContainer.appendChild(listEl);
	});
}
function clearElement(element) {
	while (element.firstChild) {
		element.removeChild(element.firstChild);
	}
}
listsContainer.addEventListener("click", (e) => {
	if (e.target.tagName.toLowerCase() === "li") {
		selectedListId = e.target.dataset.listId;
		saveAndRender();
	}
});

/////////////////////////////////// RENDER TASKS //////////////////////////////////
tasksContainer.addEventListener("click", (e) => {
	if (e.target.tagName.toLowerCase() === "input") {
		const selectedList = lists.find((list) => list.id === selectedListId);
		const selectedTask = selectedList.tasks.find(
			(task) => task.id === e.target.id
		);
		selectedTask.complete = e.target.checked;
		save();
		renderTaskCount(selectedList);
	}
});
clearCompletedTasksButton.addEventListener("click", (e) => {
	const selectedList = lists.find((list) => list.id === selectedListId);
	selectedList.tasks = selectedList.tasks.filter((task) => !task.complete);
	saveAndRender();
});
newTaskForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const taskName = newTaskInput.value;
	if (taskName == null || taskName === "") return;
	const task = createTask(taskName);
	newTaskInput.value = null;
	const selectedList = lists.find((list) => list.id === selectedListId);
	selectedList.tasks.push(task);
	saveAndRender();
});
function renderTasks(selectedList) {
	selectedList.tasks.forEach((task) => {
		const taskElement = document.importNode(taskTemplate.content, true);
		const checkbox = taskElement.querySelector("input");
		checkbox.id = task.id;
		checkbox.checked = task.complete;
		const label = taskElement.querySelector("label");
		label.htmlFor = task.id;
		label.append(task.name);
		tasksContainer.appendChild(taskElement);
	});
}

function renderTaskCount(selectedList) {
	const incompleteTaskCount = selectedList.tasks.filter(
		(task) => !task.complete
	).length;
	const taskString = incompleteTaskCount === 1 ? "task" : "tasks";
	listCountElement.innerText = `${incompleteTaskCount} ${taskString} remaining`;
}

render();

/////////////////////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------------------//

/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////// NOTES APP ///////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
