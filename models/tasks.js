const Task = require("./task");

class Tasks {
  _list = {};

  get listArray() {
    const array = [];
    Object.keys(this._list).forEach((key) => {
      const task = this._list[key];
      array.push(task);
    });
    return array;
  }

  constructor() {
    this._list = {};
  }

  deleteTask(id){
    if(this._list[id]){
        delete this._list[id];
    }
  }

  loadsTasksFromArray(tareas = []) {
    tareas.forEach((task) => {
      this._list[task.id] = task;
    });
  }

  createTask(desc) {
    const task = new Task(desc);

    this._list[task.id] = task;
  }

  completeList() {
    console.log("");
    this.listArray.forEach((task, i) => {
      const idx = ` ${i + 1}`.green;
      const { desc, finishDate } = task;
      const status = finishDate ? "Completada".green : "Pendiente".red;
      console.log(`${idx}-${desc} - ${status}`);
    });
  }
  pendientList(done) {
    let index = 0;
    this.listArray.forEach((task) => {
      const { desc, finishDate } = task;
      const status = finishDate ? "Completada".green : "Pendiente".red;

      if (done) {
        if (finishDate) {
          index++;
          console.log(`${(index + '.').green}-${desc} :: ${finishDate.green}`);
        }
      } else {
        if (!finishDate) {
          index++;
          console.log(`${(index + '.').green}-${desc} :: ${status}`);
        }
      }
    });
  }

  toggleCompleted(ids = []){
    ids.forEach(id =>{

        const task = this._list[id]

        if(!task.finishDate){
            task.finishDate = new Date().toISOString()
        }
    })

    this.listArray.forEach(task =>{
        if(!ids.includes(task.id)){
            this._list[task.id].finishDate = null
        }
    })
  }
}

module.exports = Tasks;
