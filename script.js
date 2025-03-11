let toDoList = JSON.parse(localStorage.getItem('toDoList')) || [];

document.getElementById('add').onclick = function() {
    addToDo();
};

document.getElementById('input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addToDo();
    }
});

function addToDo() {
    let task = document.getElementById('input').value;
    let date = document.getElementById('date').value;
    if (task.trim() !== '') {
        toDoList.push({ task, date });
        localStorage.setItem('toDoList', JSON.stringify(toDoList));
        console.log(toDoList);
        displayList();
        document.getElementById('input').value = '';
        document.getElementById('date').value = '';
    }
}

function displayList() {
    document.getElementsByClassName('js-to-do-list-container')[0].innerHTML = '';
    for (let i = 0; i < toDoList.length; i++) {
        document.getElementsByClassName('js-to-do-list-container')[0].innerHTML += 
        `
        <div class="element-container">
            <div class="to-do-list-element">${i+1}. ${toDoList[i].task}</div>
            <div class="to-do-list-date">${toDoList[i].date}</div>
            <button class="remove-button" onclick="removeElement(${i})">Remove</button>
        </div>
        `;
    }
}

function removeElement(i) {
    toDoList.splice(i, 1);
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
    displayList();
}

displayList();