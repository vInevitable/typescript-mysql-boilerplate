import Excel, {Buffer, Column, Row} from 'exceljs';

import logger from 'logger';

export async function generateExcel(headers: Column[], payload: any[]): Promise<Buffer> {
    try {
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet('sheet0');
        worksheet.columns = headers;
        payload.forEach((rowData) => {
            const row: Row = {} as Row;
            for (const header of headers) {
                row[header.key] = rowData[header.key];
            }
            worksheet.addRow(row);
        });
        return workbook.xlsx.writeBuffer();
    } catch (error) {
        logger.error('ERROR occurred in helpers.excel.generateExcel()', error);
        throw error;
    }
}
