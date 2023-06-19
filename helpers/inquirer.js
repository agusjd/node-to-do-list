const inquirer = require("inquirer");
require("colors");

const menuOpts = [
  {
    type: "list",
    name: "opt",
    message: "Que desea hacer?",
    choices: [
      {
        value: "1",
        name: `${"1.".green} Crear tarea`,
      },
      {
        value: "2",
        name: `${"2.".green} Listar tareas`,
      },
      {
        value: "3",
        name: `${"3.".green} Listar tareas completadas`,
      },
      {
        value: "4",
        name: `${"4.".green} Listar tareas pendientes`,
      },
      {
        value: "5",
        name: `${"5.".green} Completar tarea(s)`,
      },
      {
        value: "6",
        name: `${"6.".green} Borrar tarea`,
      },
      {
        value: "0",
        name: `${"0.".green} Salir`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.clear();
  console.log("=========================".green);
  console.log("Seleccione una opcion".green);
  console.log("=========================\n".green);

  const { opt } = await inquirer.prompt(menuOpts);
  console.log(opt);
  return opt;
};

const pausa = async () => {
  const inputOpt = [
    {
      type: "input",
      name: "inputOpt",
      message: `\nPresione ${"Enter".green} para continuar\n`,
    },
  ];
  console.log("\n");

  await inquirer.prompt(inputOpt);
};

const readInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese un valor";
        }
        return true;
      },
    },
  ];
  const { desc } = await inquirer.prompt(question);

  return desc;
};


const listTasksToDelete = async (tasks)=>{
    const choices = tasks.map((task,id )=> {
        const idx = `${id + 1}.`.green;
        return{
          value: task.id,
          name : `${idx} ${task.desc}`,
        }
    })

    choices.unshift({
      value: '0',
      name: '0.'.green + ' Cancelar'
    })
    const questions = [{
      type:'list',
      name: 'id',
      message: 'Borrar',
      choices
    }]

    const {id} = await inquirer.prompt(questions)
 
    return id
}


const confirm  = async (message)=>{
  const question = [{
    type: 'confirm',
    name: 'ok',
    message
  }]

  const {ok} = await inquirer.prompt(question)

  return ok
}

const showCheckList = async (tasks)=>{

  const choices = tasks.map((task,id )=> {

      const idx = `${id + 1}.`.green;

      return{
        value: task.id,
        name : `${idx} ${task.desc}`,
        checked: task.finishDate ? true: false
      }
  })

  const questions = [{
    type:'checkbox',
    name: 'ids',
    message: 'Selecione',
    choices
  }]

  const {ids} = await inquirer.prompt(questions)

  return ids
}
module.exports = {
  inquirerMenu,
  pausa,
  readInput,
  listTasksToDelete,
  confirm,
  showCheckList
};
