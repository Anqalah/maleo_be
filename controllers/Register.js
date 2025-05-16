import GoogleSheetsService from "../services/googleSheetsService.js";
import FormData from "../models/FormData.js";

const submitForm = async (req, res) => {
  try {
    const {
      namaLengkap,
      tanggalLahir,
      jenisKelamin,
      pendidikanTerakhir,
      alamatLengkap,
      beratBadan,
      tinggiBadan,
      noHP,
    } = req.body;

    const formData = new FormData(
      namaLengkap,
      tanggalLahir,
      jenisKelamin,
      pendidikanTerakhir,
      alamatLengkap,
      beratBadan,
      tinggiBadan,
      noHP
    );

    await GoogleSheetsService.saveToSheet(formData);
    res.status(200).json({ message: "BERHASIL TERKIRIM" });
  } catch (error) {
    res.status(500).json({ error: "TIDAK TERKIRIM" });
  }
};

export default submitForm;
