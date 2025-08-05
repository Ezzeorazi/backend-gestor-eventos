const Invitacion = function(data) {
  Object.assign(this, data);
  this._id = this._id || String(invitaciones.length + 1);
};

const invitaciones = [];

Invitacion.prototype.save = async function() {
  invitaciones.push(this);
};

Invitacion.find = async function(filter) {
  return invitaciones.filter(i => i.evento === filter.evento);
};

Invitacion.findByIdAndUpdate = async function(id, data, options = {}) {
  const inv = invitaciones.find(i => i._id == id);
  if (!inv) return null;
  Object.assign(inv, data);
  return options.new ? inv : null;
};

Invitacion.findOne = function(filter) {
  const inv = invitaciones.find(i => i.token === filter.token);
  if (!inv) return null;
  return {
    ...inv,
    populate: async function(field) {
      if (field === 'evento') {
        const Evento = require('./evento');
        this.evento = await Evento.findById(this.evento);
      }
      return this;
    }
  };
};

Invitacion.__getData = () => invitaciones;

module.exports = Invitacion;
