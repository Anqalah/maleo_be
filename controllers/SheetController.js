import GoogleSheetsService from "../services/GoogleSheetsService.js";

let cachedData = null;
let lastETag = null; // Gunakan ETag untuk deteksi perubahan

const getLulusData = async (req, res) => {
  try {
    const data = await GoogleSheetsService.getLulusData();

    // Buat ETag sederhana dari panjang data (bisa diganti dengan hash)
    const currentETag = `${data.length}`;

    if (currentETag === lastETag) {
      return res.status(304).end(); // Tidak ada perubahan
    }

    // Update cache & ETag
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
