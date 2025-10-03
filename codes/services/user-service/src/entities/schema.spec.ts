import { getConnection } from 'typeorm';

describe('DB Schema Test', () => {
  let connection;

  beforeAll(async () => {
    connection = getConnection();
  });

  it('should have all tables', async () => {
    const tables = await connection.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('users', 'projects', 'project_members', 'conversations', 'agents', 'messages', 'billing_log')
    `);
    expect(tables.length).toBe(7);
  });

  it('should insert and query sample user', async () => {
    await connection.query("INSERT INTO users (name, email, role) VALUES ('Test User', 'test@example.com', 'member')");
    const user = await connection.query("SELECT * FROM users WHERE email = 'test@example.com'");
    expect(user[0].name).toBe('Test User');
  });
});