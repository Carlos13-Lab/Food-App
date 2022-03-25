const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,        //[ este tipo de dato es para que no se repita con el de la api]
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    spoonacularScore: {
      type: DataTypes.STRING
    },
    healthScore: {
      type: DataTypes.STRING
    },
    analyzedInstructions: {
      type: DataTypes.TEXT,
    },
    createdInDb: {                                  // {esta propiedad la van a tener solo las comidas que esten en la Base de datos}
      type: DataTypes.BOOLEAN,                    // {por lo que es mas facil buscarlas }
      allowNull: false,
      defaultValue: true
    }

  });
};
