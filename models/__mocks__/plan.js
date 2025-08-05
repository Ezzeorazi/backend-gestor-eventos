const planes = [];

class Plan {
  constructor(data) {
    Object.assign(this, data);
    this._id = this._id || String(planes.length + 1);
  }

  async save() {
    planes.push(this);
  }

  static async create(data) {
    const plan = new Plan(data);
    await plan.save();
    return plan;
  }

  static async find() {
    return planes;
  }

  static async findById(id) {
    return planes.find(p => p._id == id) || null;
  }
}

Plan.__getData = () => planes;

module.exports = Plan;
