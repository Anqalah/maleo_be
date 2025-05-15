import GoogleSheetsService from "../services/googleSheetsService.js";
import fs from "fs";
import path from "path";

let cachedData = null;
let lastETag = null;

const getLulusData = async (req, res) => {
  try {
    const data = await GoogleSheetsService.getLulusData();

    // Buat ETag sederhana dari panjang data
    const currentETag = `${data.length}`;

    if (currentETag === lastETag) {
      return res.status(304).end();
    }

    // Simpan ke file JSON di folder public
    const publicPath = path.resolve("../public/lulus.json");
    fs.writeFileSync(publicPath, JSON.stringify(data, null, 2), "utf-8");

    // Update cache dan ETag
    cachedData = data;
    lastETag = currentETag;

    res.json({
      data: cachedData,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Gagal mengambil data lulus" });
  }
};

export default { getLulusData };
