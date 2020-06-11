
module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define('Genre', {
        name : {
            type : DataTypes.STRING(100)
        }
    },{
        tableName: 'genres',
        timestamps : false
    });

    return Model;
}