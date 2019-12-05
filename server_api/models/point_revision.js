"use strict";

module.exports = function(sequelize, DataTypes) {
  var PointRevision = sequelize.define("PointRevision", {
    name: { type: DataTypes.STRING, allowNull: true },
    content: { type: DataTypes.TEXT, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
    value: { type: DataTypes.INTEGER, allowNull: false },
    website: DataTypes.STRING,
    ip_address: { type: DataTypes.STRING, allowNull: false },
    user_agent: { type: DataTypes.TEXT, allowNull: false },
    embed_data: DataTypes.JSONB,
    deleted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
  }, {
    defaultScope: {
      where: {
        deleted: false
      }
    },

    timestamps: true,

    indexes: [
      {
        fields: ['user_id', 'deleted']
      },
      {
        name: 'point_revisions_idx_deleted',
        fields: ['deleted']
      },
      {
        name: 'point_revisions_idx_deleted_point_id',
        fields: ['deleted','point_id']
      }
    ],

    underscored: true,
    tableName: 'point_revisions',
    classMethods: {
      associate: function(models) {
        PointRevision.belongsTo(models.Point);
        PointRevision.belongsTo(models.User);
      }
    }
  });

  return PointRevision;
};
