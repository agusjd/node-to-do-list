require("colors");

const {
  inquirerMenu,
  pausa,
  readInput,
  listTasksToDelete,
  confirm,
  showCheckList,
} = require("./helpers/inquirer");

const { saveDb, readDb } = require("./helpers/saveFile");

const Tasks = require("./models/tasks");

const main = async () => {
  let opt = "";

  const tasks = new Tasks();

  const tasksDb = readDb();

  if (tasksDb) {
    tasks.loadsTasksFromArray(tasksDb);
  }

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        const desc = await readInput("description: ");
        tasks.createTask(desc);
        break;
      case "2":
        tasks.completeList();
        break;
      case "3":
        tasks.pendientList(true);
        break;
      case "4":
        tasks.pendientList(false);
        break;

      case "5":
        const ids = await showCheckList(tasks.listArray)

        tasks.toggleCompleted(ids)
        break
      case "6":
        const id = await listTasksToDelete(tasks.listArray);
        if(id !== "0"){
          const ok = await confirm("Esta seguro ?");
          if (ok) {
            tasks.deleteTask(id);
          }
        }
      break
    }

    saveDb(tasks.listArray);

    await pausa();
  } while (opt !== "0");
  {
  }
};

main();
