import { RowDataPacket } from 'mysql2';

export interface BinModel extends RowDataPacket {
	id: number;
	land_address: string;
	road_address: string;
	longitude: number;
	latitude: number;
	last_update: Date;
}
