import fs from "fs";
import path from "path";
import GoogleSheetsService from "../services/googleSheetsService.js";

const getLulusData = async (req, res) => {
  try {
    const data = await GoogleSheetsService.getLulusData();

    // Pastikan folder 'public' ada
    const publicDir = path.resolve("public");
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir);
    }

    // Simpan file JSON ke folder public setiap kali diminta
    const jsonPath = path.join(publicDir, "lulus.json");
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), "utf-8");

    res.json({
      data: data,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Gagal mengambil data lulus" });
  }
};

export default { getLulusData };
