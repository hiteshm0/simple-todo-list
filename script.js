let toDoList = JSON.parse(localStorage.getItem('toDoList')) || [];
let currentView = 'inbox'; // Default view is 'inbox' (all tasks)
let editingIndex = -1; // Track which task is being edited

document.getElementById('add').onclick = function() {
    addToDo();
};

document.getElementById('input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addToDo();
    }
});

// Toggle between Inbox and Today views
document.getElementById('inbox-toggle').addEventListener('click', function() {
    setActiveToggle('inbox');
    currentView = 'inbox';
    displayList();
});

document.getElementById('today-toggle').addEventListener('click', function() {
    setActiveToggle('today');
    currentView = 'today';
    displayList();
});

function setActiveToggle(view) {
    // Remove active class from all toggle buttons
    document.querySelectorAll('.toggle-button').forEach(button => {
        button.classList.remove('active');
    });
    
    // Add active class to the selected toggle button
    document.getElementById(`${view}-toggle`).classList.add('active');
}

/* Profile button click event (for frontend only)
document.getElementById('profile').addEventListener('click', function() {
    alert('Profile button clicked! This would show user profile information.');
}); */

function addToDo() {
    let task = document.getElementById('input').value;
    let date = document.getElementById('date').value;
    
    if (editingIndex >= 0) {
        // Update existing task
        if (task.trim() !== '') {
            toDoList[editingIndex] = { task, date };
            localStorage.setItem('toDoList', JSON.stringify(toDoList));
            editingIndex = -1;
            document.getElementById('add').textContent = 'Add';
        }
    } else {
        // Add new task
        if (task.trim() !== '') {
            toDoList.push({ task, date });
            localStorage.setItem('toDoList', JSON.stringify(toDoList));
        }
    }
    
    displayList();
    document.getElementById('input').value = '';
    document.getElementById('date').value = '';
}

function displayList() {
    document.getElementsByClassName('js-to-do-list-container')[0].innerHTML = '';
    
    // Filter tasks based on current view
    let tasksToDisplay = toDoList;
    
    if (currentView === 'today') {
        // Get today's date in YYYY-MM-DD format
        const today = new Date();
        const todayString = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
        
        // Filter tasks that have today's date
        tasksToDisplay = toDoList.filter(task => task.date === todayString);
    }
    
    for (let i = 0; i < tasksToDisplay.length; i++) {
        const taskIndex = toDoList.indexOf(tasksToDisplay[i]);
        document.getElementsByClassName('js-to-do-list-container')[0].innerHTML += 
        `
        <div class="element-container">
            <div class="to-do-list-element">
                <input type="checkbox" class="task-checkbox" onclick="completeTask(${taskIndex})">
                <span>${tasksToDisplay[i].task}</span>
            </div>
            <div class="to-do-list-date">${tasksToDisplay[i].date}</div>
            <button class="edit-button" onclick="editTask(${taskIndex})">Edit</button>
        </div>
        `;
    }
}

function editTask(i) {
    // Set the form values to the task being edited
    document.getElementById('input').value = toDoList[i].task;
    document.getElementById('date').value = toDoList[i].date;
    document.getElementById('add').textContent = 'Update';
    
    // Set the editing index
    editingIndex = i;
    
    // Focus on the input
    document.getElementById('input').focus();
}

function completeTask(i) {
    // Remove the task when checkbox is clicked
    toDoList.splice(i, 1);
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
    displayList();
}

// Keeping this for compatibility but no longer used in UI
function removeElement(i) {
    toDoList.splice(i, 1);
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
    displayList();
}

displayList();