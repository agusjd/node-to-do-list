const { v4: uuidV4 } = require("uuid");

class Task {
  id = "";
  desc = "";
  finishDate = null;

  constructor(desc) {
    this.id = uuidV4();
    this.desc = desc;
    this.finishDate = null;
  }
}

module.exports = Task;
