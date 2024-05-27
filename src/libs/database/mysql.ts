import mysql, { Pool, QueryResult, FieldPacket } from 'mysql2/promise';

export default class MySQLDatabase {
	private pool: Pool;

	constructor() {
		const poolOptions = {
			host: process.env.RDS_HOST,
			user: process.env.RDS_USERNAME,
			database: process.env.RDS_DATABASE,
			port: Number(process.env.RDS_PORT),
			password: process.env.RDS_PASSWORD,
			waitForConnections: true,
			connectionLimit: 10,
			queueLimit: 0,
			enableKeepAlive: true,
		};
		this.pool = mysql.createPool(poolOptions);
	}

	private async getConnection() {
		try {
			const connection = await this.pool.getConnection();
			return connection;
		} catch (error: any) {
			console.error(`Connection error: ${error.message}`);
			throw new Error('Could not get a database connection');
		}
	}

	// Method to execute a query
	public async query<T extends QueryResult>(sql: string, params?: any[]): Promise<[T, FieldPacket[]]> {
		const connection = await this.getConnection();
		try {
			const [rows, fields] = await connection.query<T>(sql, params);
			return [rows, fields];
		} catch (error: any) {
			console.error(`Query error: ${error.message}`);
			throw new Error('Query failed');
		} finally {
			connection.release();
		}
	}

	// Method to execute a query with `execute`
	public async execute<T extends QueryResult>(sql: string, params?: any[]): Promise<[T, FieldPacket[]]> {
		const connection = await this.getConnection();
		try {
			const [result, fields] = await connection.execute<T>(sql, params);
			return [result, fields];
		} catch (error: any) {
			console.error(`Execute error: ${error.message}`);
			throw new Error('Execute failed');
		} finally {
			connection.release();
		}
	}

	public async close() {
		try {
			await this.pool.end();
		} catch (error: any) {
			console.error(`Close error: ${error.message}`);
			throw new Error('Failed to close the database pool');
		}
	}
}
