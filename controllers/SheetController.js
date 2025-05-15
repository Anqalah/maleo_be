import fs from "fs";
import path from "path";
import fetch from "node-fetch"; // pastikan diinstal di Node < 18
// import fetch from global jika pakai Node 18+

let cachedData = null;
let lastETag = null;

const getLulusData = async (req, res) => {
  try {
    const response = await fetch(process.env.GAMBAR_SHEET);

    if (!response.ok) {
      throw new Error(`Gagal fetch data, status: ${response.status}`);
    }

    const data = await response.json();
    const currentETag = JSON.stringify(data); // Gunakan hash sederhana dari data

    // Cek apakah data berubah (pakai ETag)
    if (currentETag === lastETag && cachedData) {
      return res.json({
        data: cachedData,
        cached: true,
        lastUpdated: new Date().toISOString(),
      });
    }

    // Simpan ke file JSON di folder 'public'
    const publicDir = path.resolve("public");
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir);
    }

    const jsonPath = path.join(publicDir, "lulus.json");
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), "utf-8");

    // Update cache dan ETag
    cachedData = data;
    lastETag = currentETag;

    res.json({
      data,
      cached: false,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error fetching or saving data:", error.message);
    res.status(500).json({ error: "Gagal mengambil data lulus" });
  }
};

export default { getLulusData };
