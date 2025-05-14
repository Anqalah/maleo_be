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
            formData.tempatLahir,
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
}
