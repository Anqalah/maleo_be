import { google } from "googleapis";

export default class GoogleSheetsService {
  // static async saveToSheet(formData) {
  //   const auth = new google.auth.GoogleAuth({
  //     keyFile: "credentials.json",
  //     scopes: "https://www.googleapis.com/auth/spreadsheets",
  //   });

  //   const sheets = google.sheets({ version: "v4", auth });
  //   const spreadsheetId = process.env.SPREADSHEET_ID;

  //   await sheets.spreadsheets.values.append({
  //     spreadsheetId,
  //     range: "Data",
  //     valueInputOption: "RAW",
  //     resource: {
  //       values: [
  //         [
  //           formData.namaLengkap,
  //           formData.tanggalLahir,
  //           formData.jenisKelamin,
  //           formData.pendidikanTerakhir,
  //           formData.alamatLengkap,
  //           formData.beratBadan,
  //           formData.tinggiBadan,
  //           formData.noHP,
  //         ],
  //       ],
  //     },
  //   });
  // }

  // Hapus duplikat berdasarkan "番号" (ID unik)
  static removeDuplicates(data, key) {
    const seen = new Set();
    return data.filter((item) => {
      const k = item[key];
      if (seen.has(k)) {
        return false;
      }
      seen.add(k);
      return true;
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
      range: "Lulus!B:H", // Ambil kolom *-* (sesuai header)
    });

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      return [];
    }

    // Konversi ke JSON dengan header spesifik
    const headers = [
      "番号",
      "名前",
      "住所",
      "会社名",
      "面接合格日",
      "日本への出発日",
      "写真",
    ];
    const jsonData = rows
      .slice(1)
      .map((row) => {
        if (row.length < 7) return null; // Abaikan baris yang kolomnya kurang
        const obj = {};
        headers.forEach((header, index) => {
          obj[header] = row[index] || null;
        });
        return obj;
      })
      .filter((item) => item !== null); // Hap

    const uniqueData = GoogleSheetsService.removeDuplicates(jsonData, "番号");
    return uniqueData;
  }
}
