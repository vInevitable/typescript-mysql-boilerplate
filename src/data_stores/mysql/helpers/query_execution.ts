import logger from 'logger';
import {PoolConnection} from 'mysql2/promise';
import nodeUtil from 'util';

export async function saveRecord(connection: PoolConnection, query: string, replacements: any = {}):
    Promise<string> {
    try {
        logger.info('STARTED saveRecord()');
        logger.debug(`executing sql query:${query} replacements : ${nodeUtil.inspect(replacements)} `);

        // @ts-ignore
        const result = await connection.promise().query(query, replacements);
        return getInsertedRecord(result, 'saveRecord()');
    } catch (error) {
        logger.error(`ERROR in saveRecord()`, error);
        throw error;
    }
}

export async function fetchRecord(connection: PoolConnection, query: string, replacements: any = {}):
    Promise<any> {
    try {
        logger.info('STARTED fetchRecord()');
        logger.debug(`executing sql query:${query} replacements : ${nodeUtil.inspect(replacements)} `);

        // @ts-ignore
        const result = await connection.promise().query(query, replacements);
        return getRecord(result, 'fetchRecord()');
    } catch (error) {
        logger.error(`ERROR in fetchRecord() `, error);
        throw error;
    }
}

export async function fetchRecords(connection: PoolConnection, query: string, replacements: any = {}):
    Promise<any> {
    try {
        logger.info('STARTED fetchRecords()');
        logger.debug(`executing sql query:${query} replacements : ${nodeUtil.inspect(replacements)} `);
        // @ts-ignore
        const result = await connection.promise().query(query, replacements);
        return result[0];
    } catch (error) {
        logger.error(`ERROR in fetchRecords()`, error);
        throw error;
    }
}

export async function updateRecord(connection: PoolConnection, query: string, replacements: any = {}):
    Promise<void> {
    try {
        logger.info('STARTED updateRecord()');
        logger.debug(`executing sql query:${query} replacements : ${nodeUtil.inspect(replacements)} `);
        // @ts-ignore
        await connection.promise().query(query, replacements);
        return;
    } catch (error) {
        logger.error(`ERROR in updateRecord()`, error);
        throw error;
    }
}

export async function deleteRecord(connection: PoolConnection, query: string, replacements: any = {}):
    Promise<void> {
    try {
        logger.info('STARTED deleteRecord()');
        logger.debug(`executing sql query:${query} replacements : ${nodeUtil.inspect(replacements)} `);
        // @ts-ignore
        await connection.promise().query(query, replacements);
        return;
    } catch (error) {
        logger.error(`ERROR in deleteRecord()`, error);
        throw error;
    }
}

export function getRecord(dbResultsArray: any, debugMsg: string): any {
    if (Array.isArray(dbResultsArray)) {
        if (dbResultsArray.length === 0) {
            return null;
        } else if (dbResultsArray.length === 2) {
            return dbResultsArray[0][0];
        } else {
            throw(new Error('More than one record found for ' + debugMsg));
        }
    }
}

export function getInsertedRecord(dbResultArray: any, debugMsg: string): any {
    if (Array.isArray(dbResultArray)) {
        if (dbResultArray.length === 0) {
            return null;
        } else {
            return dbResultArray[0].insertId;
        }
    }
}
