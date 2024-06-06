import inquirer from  "inquirer"

interface Todolist {
    task: string;
    completed: boolean;
}

let todoList: Todolist[] = [];

async function mainMenu() {
    const { action } = await inquirer.prompt({
        type: "list",
        name: "action",
        message: "what would you like to do?",
        choices: ["Add Task","View List","Mark as complete","Delete Task","Exit"]
    });

    switch (action) {
        case 'Add Task':    
            await addTask();
            break;
        case 'View List':
            await viewList();
            break;
        case 'Mark as complete':
            await markCompleted();
            break;
        case 'Delete Task':
            await deleteTask();
            break;
    
        case 'Exit':
            console.log('Goodbye!');
            return;             
    }
        mainMenu();

}
   

   let addTask = async () => {
    let { task } = await inquirer.prompt({
        type: "input",
        name: "task",
        message: "Enter the task?"
    });
    todoList.push({task,completed: false});
    console.log("task Added successfully");
     
   };

   let viewList = () => {
    console.log(" ***** To Do List ***** ");
    todoList.forEach((item, index) => {
        console.log(`${index + 1}.[${item.completed ? 'X' : ''}] ${item.task}`)
    });
    console.log("***************");
   }

   let markCompleted = async () => {
    let { index } = await inquirer.prompt({
        type: "number",
        name: "index",
        message: "Which task do you want to mark as complete?"
    });
    if (index > 0 && index <= todoList.length) {
        todoList[index - 1].completed = true;
        console.log("Task marked as complete");
    } else {
        console.log("Invalid task number. please try again.");
    }
   }

   let deleteTask = async () => {
    let { index } = await inquirer.prompt({
        type: "number",
        name: "index",
        message: "Which task do you want to delete?"
    });
    if (index > 0 && index <= todoList.length) {
        todoList.splice(index - 1, 1);
        console.log("Task deleted successfully");
    } else {
        console.log("Invalid task number. please try again.");
    }
   }

    mainMenu()