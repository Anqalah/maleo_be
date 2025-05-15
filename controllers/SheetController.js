// Di SheetController.js
let cachedData = null;
let lastETag = null; // Gunakan ETag untuk deteksi perubahan

export default class SheetController {
  static async getLulusData(req, res) {
    try {
      const data = await GoogleSheetsService.getLulusData();
      const currentETag = JSON.stringify(data);

      // Jika data tidak berubah, kirim 304
      if (currentETag === lastETag) {
        return res.status(304).end();
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
      res.status(500).json({ error: "Gagal mengambil data" });
    }
  }
}
