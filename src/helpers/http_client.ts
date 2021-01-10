import Axios from 'axios';
import log from 'logger';

export async function requestExternalAPI(httpMethod: string, path: string, headers?: any, body?: any, params?: any):
    Promise<any> {
    log.info('requestExternalAPI()');
    log.debug('STARTED requesting External API');
    try {
        if (httpMethod === 'POST') {
            return await Axios.post(path, body, {headers});
        } else if (httpMethod === 'GET') {
            return await Axios.get(path, {headers, params});
        }
    } catch (e) {
        log.error('ERROR occurred requestExternalAPI() ', e);
        return;
    }
}
