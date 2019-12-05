"use strict";

module.exports = function(sequelize, DataTypes) {
  var PostRevision = sequelize.define("PostRevision", {
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    data: DataTypes.JSONB,
    deleted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
  }, {
    defaultScope: {
      where: {
        deleted: false
      }
    },
    indexes: [
      {
        fields: ['user_id', 'deleted']
      },
      {
        name: 'post_revisions_idx_deleted',
        fields: ['deleted']
      },
      {
        name: 'post_revisions_idx_post_id_deleted',
        fields: ['deleted','post_id']
      }
    ],
    timestamps: true,
    underscored: true,
    tableName: 'post_revisions',
    classMethods: {
      associate: function(models) {
        PostRevision.belongsTo(models.Post);
        PostRevision.belongsTo(models.User);
      }
    }
  });
  return PostRevision;
};
