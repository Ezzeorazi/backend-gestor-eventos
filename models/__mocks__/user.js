const users = [];

class User {
  constructor(data) {
    Object.assign(this, data);
    this._id = this._id || String(users.length + 1);
  }

  async save() {
    users.push(this);
  }

  compararContraseña(contraseña) {
    return Promise.resolve(this.contraseña === contraseña);
  }

  static async findOne(filter) {
    return users.find(u => u.email === filter.email) || null;
  }

  static async find() {
    return users;
  }

  static async findById(id) {
    return users.find(u => u._id == id) || null;
  }

  static async findByIdAndUpdate(id, data, options = {}) {
    const usuario = users.find(u => u._id == id);
    if (!usuario) return null;
    Object.assign(usuario, data);
    return options.new ? usuario : null;
  }

  static async deleteOne(filter) {
    const index = users.findIndex(u => u.email === filter.email);
    if (index !== -1) users.splice(index, 1);
  }
}

module.exports = User;
