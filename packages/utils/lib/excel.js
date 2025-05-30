import XLSX from 'xlsx';

/**
 * Read Excel data from an ArrayBuffer or File object
 * @param {ArrayBuffer|File} input
 * @returns {Array<Object>} parsed data
 */
export async function readExcel(input) {
  let buffer;
  if (input instanceof ArrayBuffer) {
    buffer = input;
  } else if (input && typeof input.arrayBuffer === 'function') {
    buffer = await input.arrayBuffer();
  } else {
    throw new Error('Unsupported input type for readExcel');
  }
  const arr = new Uint8Array(buffer);
  const workbook = XLSX.read(arr, { type: 'array' });
  const sheet = workbook.SheetNames[0];
  return XLSX.utils.sheet_to_json(workbook.Sheets[sheet], { defval: '' });
}

/**
 * Export JSON data to an Excel file
 * @param {Array<Object>} data
 * @param {String} filename
 */
export function writeExcel(data, filename = 'export.xlsx') {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, filename);
}
