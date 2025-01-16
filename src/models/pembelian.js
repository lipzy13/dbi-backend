const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const MetodePembayaran = require("./metodePembayaran");

const Pembelian = sequelize.define("pembelian", {
  pembelian_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  tanggal_waktu: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  cash_or_non: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  metode_pembayaran_id: {
    type: DataTypes.INTEGER,
    references: {
      model: MetodePembayaran,
      key: 'metode_id'
    }
  },
  sub_total: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  diskon: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  pajak: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  total_pembelian: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  }
});

module.exports = Pembelian;  