import { schema } from 'normalizr';

export const deviceSchema = new schema.Entity('device', {}, { idAttribute: 'deviceName' });
export const deviceListSchema = [deviceSchema];
