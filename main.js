let tasks = []; // задали какой-то массив

let form = document.querySelector('.top-line'); // берем данные
let body = document.querySelector('.app-body'); // создаем поле куда будем класть данные
let searchField = document.querySelector('[name="searchField"]'); // поле для поиска


// создаем форму того, с чем работаем
form.onsubmit = function(e) {
	e.preventDefault(); // изменили поведение страницы

	let fieldOne = document.querySelector('[name="form-control-one"]'); //нашли
	let valueOne = fieldOne.value; // взяли
	let fieldTwo = document.querySelector('[name="form-control-two"]');
	let valueTwo = fieldTwo.value;
	let fieldThree = document.querySelector('[name="form-control-three"]');
	let valueThree = fieldThree.value;
	let fieldFour = document.querySelector('[name="form-control-four"]');
	let valueFour = fieldFour.value;
	let textarea = document.querySelector('[name="form-control-five"]');
	let value = textarea.value;

	form.reset(); // подчищаем 

	// формируем задание: этот объект привязан как-то к атрибутам html документа? (по идее нет?)   ???
	let task = {
		title: valueOne,
		name: valueTwo,
		dateTask: valueThree,
		timeTask: valueFour,
		notes: value,
	};

	tasks.push(task); // добавляем задание в массив 

	renderHtml(tasks); // вызываем функцию
}

// задаем принцип работы с разметкой
function renderHtml(tasks) {
	body.innerHTML = ''; // чистим body
	for (let i = 0; i < tasks.length; i++) { // перебираем массив
		let createdMarkup = createTask(tasks[i], i); // для каждого элемента массива создаем задание
		body.appendChild(createdMarkup); // создаем то что получилось и кладем в body
	} 
}

// создаем разметку внутри документа
function createTask(task, index) {
	let wrapper = document.createElement('div');  // создаем div
	wrapper.classList.add('item'); // присвоили диву класс item

	let wrapperPart = document.createElement('div');
	wrapper.appendChild(wrapperPart);
	wrapperPart.classList.add('wrapperPart');

	let wrapperFirstPart = document.createElement('div');
	wrapperPart.appendChild(wrapperFirstPart);
	wrapperFirstPart.classList.add('itemFirstPart');

	let wrapperSecondPart = document.createElement('div');
	wrapperPart.appendChild(wrapperSecondPart);
	wrapperSecondPart.classList.add('itemSecondPart');

	let tagForTitle = document.createElement('span');
	wrapperFirstPart.appendChild(tagForTitle); 
	tagForTitle.textContent = task.title;

	let tagForButton = document.createElement('button');
	tagForButton.classList.add('newButton');
	wrapperFirstPart.appendChild(tagForButton); 
	tagForButton.textContent = 'Удалить';
	tagForButton.onclick = function() {
		tasks.splice(index,1);
		renderHtml(tasks);
	}

	let tagForDate = document.createElement('span');
	tagForDate.classList.add('dateDirection');
	wrapperSecondPart.appendChild(tagForDate); 
	tagForDate.textContent = task.dateTask;

	let tagForTime = document.createElement('span');
	tagForTime.classList.add('timeDirection');
	wrapperSecondPart.appendChild(tagForTime); 
	tagForTime.textContent = task.timeTask;

	let tagForName = document.createElement('p');
	wrapper.appendChild(tagForName); 
	tagForName.textContent = task.name;

	let tagForNotes = document.createElement('p');
	wrapper.appendChild(tagForNotes); 
	tagForNotes.textContent = task.notes;

	return wrapper;
}

searchField.oninput = function() { 

	let filteredTasks = [];
	for (let i = 0; i < tasks.length; i++) {
		if (tasks[i].title.toLowerCase().includes(searchField.value.toLowerCase())) {
			filteredTasks.push(tasks[i]);
		}
	}
	renderHtml(filteredTasks);
}