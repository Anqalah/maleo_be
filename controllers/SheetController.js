import fs from "fs";
import path from "path";
import GoogleSheetsService from "../services/googleSheetsService.js";

let cachedData = null;
let lastETag = null;

const getLulusData = async (req, res) => {
  try {
    const data = await GoogleSheetsService.getLulusData();
    const currentETag = `${data.length}`;

    if (currentETag === lastETag) {
      return res.status(304).end();
    }

    // Pastikan folder 'public' ada
    const publicDir = path.resolve("public");
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir);
    }

    // Simpan file JSON ke folder public
    const jsonPath = path.join(publicDir, "lulus.json");
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), "utf-8");

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
