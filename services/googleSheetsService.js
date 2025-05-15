import { google } from "googleapis";

export default class GoogleSheetsService {
  static async saveToSheet(formData) {
    const auth = new google.auth.GoogleAuth({
      keyFile: "credentials.json",
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.SPREADSHEET_ID;

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Data",
      valueInputOption: "RAW",
      resource: {
        values: [
          [
            formData.namaLengkap,
            formData.tanggalLahir,
            formData.jenisKelamin,
            formData.pendidikanTerakhir,
            formData.alamatLengkap,
            formData.beratBadan,
            formData.tinggiBadan,
            formData.noHP,
          ],
        ],
      },
    });
  }

  static async getLulusData() {
    const auth = new google.auth.GoogleAuth({
      keyFile: "credentials.json",
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.SPREADSHEET_ID;

    // Ambil data dari sheet "lulus"
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Lulus!A:F", // Ambil kolom A-F (sesuai header)
    });

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      return [];
    }

    // Konversi ke JSON dengan header spesifik
    const headers = [
      "番号",
      "名前",
      "会社名",
      "面接合格日",
      "日本への出発日",
      "写真",
    ];
    const jsonData = rows.slice(1).map((row) => {
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = row[index] || null; // Handle cell kosong
      });
      return obj;
    });

    // Hapus duplikat berdasarkan "番号" (ID unik)
    const uniqueData = this.removeDuplicates(jsonData, "番号");
    return uniqueData;
  }
}
