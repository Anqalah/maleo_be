export default class FormData {
  constructor(
    namaLengkap,
    tanggalLahir,
    jenisKelamin,
    pendidikanTerakhir,
    alamatLengkap,
    beratBadan,
    tinggiBadan,
    noHP
  ) {
    this.namaLengkap = namaLengkap; // 名前
    this.tanggalLahir = tanggalLahir; // 生年月日
    this.jenisKelamin = jenisKelamin; // 性別
    this.pendidikanTerakhir = pendidikanTerakhir; // 最終学歴
    this.alamatLengkap = alamatLengkap; // 住所
    this.beratBadan = beratBadan; // 体重
    this.tinggiBadan = tinggiBadan; // 身長
    this.noHP = noHP; // 電話番号
  }
}
