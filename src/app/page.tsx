import KakaoMap from '@/components/KakaoMap';
import MySQLDatabase from '@/libs/database/mysql';
import { BinModel } from '@/types/Models';
import { FieldPacket } from 'mysql2';
import { fetchPositionFromKakao } from '@/utilities/fetchPositionFromKakao';

export default async function Page() {
	const db = new MySQLDatabase();
	const selectAllBinsWithNullPositionQuery = 'SELECT * FROM `bins` WHERE `latitude` IS NULL AND `longitude` IS NULL';
	const [rows]: [BinModel[], FieldPacket[]] = await db.execute(selectAllBinsWithNullPositionQuery);

	if (rows && rows.length > 0) {
		console.log(rows, 'NEED UPDATE');

		const updateBinPosition = async (
			db: MySQLDatabase,
			id: number,
			position: { longitude: number; latitude: number }
		) => {
			const updateQuery = 'UPDATE `bins` SET `latitude` = ?, `longitude` = ? WHERE `id` = ?';
			const values = [position.latitude, position.longitude, id];
			await db.execute(updateQuery, values);
		};

		const updatePromises = rows.map(async (row) => {
			const address = row.land_address || row.road_address;
			const position = await fetchPositionFromKakao(address);

			if (!position) {
				return;
			}

			await updateBinPosition(db, row.id, position);
		});

		await Promise.all(updatePromises);
		console.log('positions updated');
	} else {
		console.log('no rows need update');
	}

	const [data]: [BinModel[], FieldPacket[]] = await db.query('SELECT * FROM `bins`');

	return <KakaoMap data={data}></KakaoMap>;
}
