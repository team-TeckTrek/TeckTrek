require('dotenv').config(); // .envファイルを読み込むために必要

const { MongoClient } = require('mongodb');

async function testConnection() {
  const uri = process.env.DB_URL; // .envから接続文字列を取得

  if (!uri) {
    console.error('エラー: DB_URLが.envファイルに設定されていません。');
    return;
  }

  const client = new MongoClient(uri);

  try {
    // MongoDBに接続
    await client.connect();
    console.log('MongoDBに正常に接続しました！');

    // 接続したデータベースのリストを取得してみる（オプション）
    const adminDb = client.db().admin();
    const listDatabases = await adminDb.listDatabases();
    console.log('利用可能なデータベース:', listDatabases.databases.map(db => db.name));

  } catch (e) {
    console.error('MongoDBへの接続中にエラーが発生しました:', e);
  } finally {
    // 接続を閉じる
    await client.close();
    console.log('MongoDB接続を閉じました。');
  }
}

testConnection();