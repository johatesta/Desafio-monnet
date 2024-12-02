import * as fs from "fs";
import * as path from "path";
import XLSX from "xlsx";

const excelFolderPath = path.join(__dirname, "../data/");
export function read_data(fileName: string): any[] {
  const fullPath = path.join(excelFolderPath, fileName)
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Cannot find file at path: ${fullPath}. Please verify it exists.`)
  }
    const workbook = XLSX.readFile(fullPath)
    const dataFromSheet = XLSX.utils.sheet_to_json(
      workbook.Sheets[workbook.SheetNames[0]]
    );


    
    return dataFromSheet;
}