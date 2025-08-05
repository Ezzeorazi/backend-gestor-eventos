const eventos = [];

class Evento {
  constructor(data) {
    Object.assign(this, data);
    this._id = this._id || String(eventos.length + 1);
    this.invitaciones = this.invitaciones || [];
  }

  async save() {
    eventos.push(this);
  }

  static async find(filter) {
    if (filter && filter.usuario) {
      return eventos.filter(e => e.usuario === filter.usuario);
    }
    return eventos;
  }

  static async findOne(filter) {
    return eventos.find(e => e._id == filter._id && e.usuario === filter.usuario) || null;
  }

  static async findById(id) {
    return eventos.find(e => e._id == id) || null;
  }

  static async findOneAndUpdate(filter, data, options = {}) {
    const evento = await this.findOne(filter);
    if (!evento) return null;
    Object.assign(evento, data);
    return options.new ? evento : null;
  }

  static async findOneAndDelete(filter) {
    const index = eventos.findIndex(e => e._id == filter._id && e.usuario === filter.usuario);
    if (index === -1) return null;
    const [deleted] = eventos.splice(index, 1);
    return deleted;
  }
}

Evento.__getData = () => eventos;

module.exports = Evento;
