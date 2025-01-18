// relation files

// models/relation.js  
const sequelize = require('../config/database');
const DivisiKaryawan = require('./divisiKaryawan');
const JenisBarang = require('./jenisBarang');
const Karyawan = require('./karyawan');
const KategoriBarang = require('./kategoriBarang');
const Kpi = require('./kpi');
const Packaging = require('./packaging');
const ProdukPenjualan = require('./produkPenjualan');
const Cabang = require('./cabang');
const TargetBulananKasir = require('./targetBulananKasir');
const CutiKaryawan = require('./cutiKaryawan');
const AbsensiKaryawan = require('./absensiKaryawan');
const KpiKaryawan = require("./kpiKaryawan");
const MetodePembayaran = require('./metodePembayaran');
const Penjualan = require('./penjualan');
const Pembelian = require('./pembelian');
const ProdukPembelian = require('./produkPembelian');
const Barang = require('./barang');
const Bundling = require('./bundling');
const Addons = require('./addons');


JenisBarang.hasMany(Barang, {
    foreignKey: 'jenis_barang_id',
    as: 'barang'
})
Barang.belongsTo(JenisBarang, {
    foreignKey: 'jenis_barang_id',
    as: 'jenis'
})

KategoriBarang.hasMany(Barang, {
    foreignKey: 'kategori_barang_id',
    as: 'barang'
})
Barang.belongsTo(KategoriBarang, {
    foreignKey: 'kategori_barang_id',
    as: 'kategori'
})

Bundling.hasMany(Addons, {
    foreignKey: 'bundling_id',
    as: 'addons'
})

Addons.belongsTo(Bundling, {
    foreignKey: 'bundling_id',
    as: 'bundling'
})

Packaging.hasMany(Addons, {
    foreignKey: 'packaging_id',
    as: 'addons'
})

Addons.belongsTo(Packaging, {
    foreignKey: 'packaging_id',
    as: 'packaging'
})

Bundling.belongsTo(Cabang, {
    foreignKey: 'cabang_id',
    as: 'cabang'
})

Cabang.hasMany(Bundling, {
    foreignKey: 'cabang_id',
    as: 'bundling'
})

MetodePembayaran.hasMany(Penjualan, {
    foreignKey: "metode_pembayaran_id",
    as: 'penjualan'
});

MetodePembayaran.hasMany(Pembelian, {
    foreignKey: "metode_pembayaran_id",
    as: "pembelian"
})

Penjualan.belongsTo(MetodePembayaran, {
    foreignKey: "metode_pembayaran_id",
    as: "metode"
})

ProdukPenjualan.belongsTo(Barang, {
    foreignKey: "barang_id",
    as: "barang",
})

Penjualan.hasMany(ProdukPenjualan, {
    foreignKey: "penjualan_id",
    as: "produk",
});

ProdukPenjualan.belongsTo(Penjualan, {
    foreignKey: "penjualan_id",
    as: 'penjualan'
})

Pembelian.hasMany(ProdukPembelian, {
    foreignKey: "pembelian_id",
    as: "produk"
})

ProdukPembelian.belongsTo(Pembelian, {
    foreignKey: "pembelian_id",
    as: "pembelian"
})

ProdukPembelian.belongsTo(Cabang, {
    foreignKey: "cabang_id",
    as: "cabang"
})

ProdukPenjualan.belongsTo(Cabang, {
    foreignKey: "cabang_id",
    as: "cabang"
})

ProdukPembelian.belongsTo(Barang, {
    foreignKey: "barang_id",
    as: "barang",
})

DivisiKaryawan.hasMany(Karyawan, {
    foreignKey: "divisi_karyawan_id",
    as: "karyawan",
})

Karyawan.belongsTo(DivisiKaryawan, {
    foreignKey: "divisi_karyawan_id",
    as: "divisi"
})

DivisiKaryawan.hasMany(Kpi, {
    foreignKey: "divisi_karyawan_id",
    as: "kpi",
})

Kpi.belongsTo(DivisiKaryawan, {
    foreignKey: "divisi_karyawan_id",
    as: "divisi"
})

Cabang.hasMany(TargetBulananKasir, {
    foreignKey: "cabang_id",
    as: "target_bulanan_kasir",
})

TargetBulananKasir.belongsTo(Cabang, {
    foreignKey: "cabang_id",
    as: "cabang",
})

Karyawan.hasMany(CutiKaryawan, {
    foreignKey: "karyawan_id",
    as: "cuti_karyawan",
})

CutiKaryawan.belongsTo(Karyawan, {
    foreignKey: "karyawan_id",
    as: "karyawan",
})

Karyawan.hasMany(AbsensiKaryawan, {
    foreignKey: "karyawan_id",
    as: "absensi_karyawan",
})

AbsensiKaryawan.belongsTo(Karyawan, {
    foreignKey: "karyawan_id",
    as: "karyawan",
})

Cabang.hasMany(Karyawan, {
    foreignKey: "cabang_id",
    as: "karyawan",
})

Cabang.hasMany(Karyawan, {
    foreignKey: "cabang_id_first",
    as: "karyawan_first",
})

Karyawan.belongsTo(Cabang, {
    foreignKey: "cabang_id",
    as: "cabang",
})

Karyawan.belongsTo(Cabang, {
    foreignKey: "cabang_id_first",
    as: "cabang_first",
})

Karyawan.hasMany(KpiKaryawan, {
    foreignKey: "karyawan_id",
    as: "kpi_karyawan",
})

KpiKaryawan.belongsTo(Karyawan, {
    foreignKey: "karyawan_id",
    as: "karyawan",
})

Kpi.hasMany(KpiKaryawan, {
    foreignKey: "kpi_id",
    as: "kpi_karyawan",
})

KpiKaryawan.belongsTo(Kpi, {
    foreignKey: "kpi_id",    
    as: "kpi",
})

// Sync models with the database  
const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: true }); // Use force: true only in development  
        //Seederrrr
        await require('./seed')();
        console.log("Database & tables created!");
    } catch (error) {
        console.error("Error syncing database:", error);
    }
};

syncDatabase();

module.exports = {
    sequelize
};  
