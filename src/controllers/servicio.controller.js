import Servicio from "../models/servicio.model.js";

export const servicio = async (req, res) => {
    const listaservicios = await Servicio.find();
    res.json(listaservicios);
};

export const tablaServicio = async (req, res) => {
  try {
    const resultadoDeleteMany = await Servicio.deleteMany({});
    await Servicio.insertMany([
      {nombre: 'ADNS 192.168.10.10', dominio: 'dns.corpoelec.com', estatus: 'desconocido'},
      {nombre: 'BCorreo Web', dominio: 'correo.corpoelec.com',estatus: 'desconocido'},
      {nombre: 'CIntranet', dominio: 'intranet.corpoelec.com',estatus: 'desconocido'},
      {nombre: 'DCorreo Thunderbird1', dominio: 'thunderbird.corpoelec.com',estatus: 'desconocido'}
    ]);
    res.send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

  
export const crearServicio = async (req, res) => {
    try {
      const { nombre, dominio, estatus } = req.body;
      const nuevoServicio = new Servicio({
        nombre: nombre,
        dominio: dominio,
        estatus: estatus
      });
  
      const servicioAgregado = await nuevoServicio.save();
  
      res.json({
        id: servicioAgregado._id,
        name: servicioAgregado.nombre,
        dominio: servicioAgregado.dominio,
        estatus: servicioAgregado.estatus
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

export const eliminarServicio = async (req, res) => {
  try {
    const servicio = await Servicio.findByIdAndDelete(req.params.id);
    if (!servicio)
      return res.status(404).json({ message: "Servicio no Encontrado" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const editarServicio = async (req, res) => {
  try {
    const { nombre, dominio, estatus, estatusColor, ultimoPing } = req.body;
    const servicioEditado = await Servicio.findOneAndUpdate(
      { _id: req.params.id },
      { nombre, dominio, estatus, estatusColor, ultimoPing },
      { new: true }
    );
    return res.json(servicioEditado);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};