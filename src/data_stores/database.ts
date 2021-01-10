import {MYSQL_DATABASE} from 'loaders/config';
import log from 'logger';
import {createPool} from 'mysql2';
import {convertDateTimeToMysqlDateTime} from 'utils/date';

let pool;
const ESCAPE_FIELDS = ['order', 'sort_order', 'sort_by', 'limit', 'offset', 'sortBy', 'sortOrder'];

export const sqlConnection = async () => {
    try {
        log.info(`sqlConnection()`);
        log.debug(`creating connection with config: ${JSON.stringify(MYSQL_DATABASE)}`);
        if (pool) {
            return pool;
        }
        pool = createPool({
            host: MYSQL_DATABASE.address,
            user: MYSQL_DATABASE.username,
            database: MYSQL_DATABASE.db_name,
            password: MYSQL_DATABASE.password,
            connectionLimit: 10,
            multipleStatements: true,
            waitForConnections: true,
            queueLimit: 0,
            dateStrings: ['DATE'],
            queryFormat: (query, values) => {
                if (!values) {
                    return query;
                }
                return query.replace(/\:(\w+)/g, (txt, key) => {
                    if (values.hasOwnProperty(key)) {
                        if (typeof values[key] === 'undefined') {
                            throw new Error(`${key} is can't be undefined!`);
                        }
                        if (ESCAPE_FIELDS.indexOf(key) !== -1) {
                            return values[key];
                        }
                        if (typeof values[key] === 'string' && !(values[key] instanceof Date)) {
                            return `'${(values[key])}'`;
                        } else if (values[key] instanceof Date) {
                            return `'${convertDateTimeToMysqlDateTime(values[key])}'`;
                        }
                        return values[key];
                    }
                    return txt;
                });
            },
        });
        await pool.getConnection((err, _) => {
            if (err) {
                log.error('ERROR Occurred while authenticating sqlConnection()', err);
                throw  err;
            }
            log.info('SQL connection established successfully !');
        });
        return pool;
    } catch (error) {
        log.error('ERROR Occurred while creating sqlConnection()', error);
        throw error;
    }
};
