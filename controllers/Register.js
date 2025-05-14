import GoogleSheetsService from "../services/googleSheetsService.js";
import FormData from "../models/FormData.js";

const submitForm = async (req, res) => {
  try {
    const {
      namaLengkap,
      tempatLahir,
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
      tempatLahir,
      tanggalLahir,
      jenisKelamin,
      pendidikanTerakhir,
      alamatLengkap,
      beratBadan,
      tinggiBadan,
      noHP
    );

    await GoogleSheetsService.saveToSheet(formData);
    res.status(200).json({ message: "データが正常に保存されました！" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default submitForm;
