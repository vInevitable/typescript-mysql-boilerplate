import {sqlConnection} from 'data_stores/database';
import log from 'logger';
import {PoolConnection} from 'mysql2/promise';

const TAG = 'data_stores.mysql.helpers.transaction.';

export async function beginTransaction(connection: PoolConnection): Promise<void> {
    log.info(TAG + 'beginTransaction()');
    log.debug('STARTED transaction');
    try {
        // @ts-ignore
        return await connection.promise().beginTransaction();
    } catch (e) {
        log.error('ERROR occurred beginTransaction() ', e);
        throw e;
    }
}

export async function closeTransaction(connection: PoolConnection): Promise<void> {
    log.info('endTransaction()');
    log.debug('END transaction');
    try {
        // @ts-ignore
        return await connection.promise().release();
    } catch (e) {
        log.error('ERROR occurred endTransaction() ', e);
        throw e;
    }
}

export async function commitTransaction(connection: PoolConnection): Promise<void> {
    log.info('commitTransaction()');
    log.debug('COMMIT transaction');
    try {
        // @ts-ignore
        return await connection?.promise().commit();
    } catch (e) {
        log.error('ERROR occurred commitTransaction() ', e);
        throw e;
    }
}

export async function rollBackTransaction(connection: PoolConnection): Promise<void> {
    log.info('rollBackTransaction()');
    log.debug('ROLLBACK transaction');
    try {
        // @ts-ignore
        return await connection?.promise().rollback();
    } catch (e) {
        log.error('ERROR occurred rollBackTransaction() ', e);
        throw e;
    }
}

export async function handleTransaction(connection: PoolConnection, commit: boolean, module: string = '') {
    log.info(TAG + 'handleTransaction()');
    try {
        if (commit) {
            log.debug('COMMIT transaction ' + module);
            // @ts-ignore
            return await connection?.promise().commit();
        }
        log.debug('ROLLBACK transaction ' + module);
        // @ts-ignore
        return await connection?.promise().rollback();
    } catch (e) {
        log.error('ERROR occurred handleTransaction() ', e);
        throw e;
    }
}

export function getSqlConnection(isTransactional?: boolean): Promise<PoolConnection> {
    log.info('getSqlConnection()');
    log.debug('GET connection');
    return new Promise(async (resolve, reject) => {
        try {
            const pool = await sqlConnection();
            pool.getConnection(async (error, connection) => {
                if (error) {
                    reject(error);
                } else {
                    if (isTransactional) {
                        await beginTransaction(connection);
                    }
                    resolve(connection);
                }
            });
        } catch (e) {
            log.error('ERROR occurred getSqlConnection() ', e);
            throw e;
        }
    });
}
