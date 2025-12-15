// debugDatabase.js
// Script untuk mengecek struktur database MongoDB

const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://javasrabnii_db_user:R0H5dqcgmWKOtFRD@sch-learning-app.drzqj19.mongodb.net/?appName=sch-learning-app';
const dbName = 'test';
const collectionName = 'materials';

async function debugDatabase() {
  const client = new MongoClient(uri);
  
  try {
    console.log('🔍 CHECKING DATABASE STRUCTURE');
    console.log('═'.repeat(60));
    
    await client.connect();
    console.log('✅ Connected to MongoDB\n');
    
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    
    // 1. Cek total dokumen
    const totalDocs = await collection.countDocuments();
    console.log(`📊 Total documents: ${totalDocs}\n`);
    
    // 2. Cek dokumen kelas 7 (ambil 1 contoh lengkap)
    console.log('📚 KELAS 7 SAMPLE:');
    console.log('─'.repeat(60));
    const kelas7Sample = await collection.findOne({ class: 7 });
    if (kelas7Sample) {
      console.log('Document ID:', kelas7Sample._id);
      console.log('Title:', kelas7Sample.title);
      console.log('Class:', kelas7Sample.class);
      console.log('Description:', kelas7Sample.description?.substring(0, 50) + '...');
      console.log('\nSubTopics:');
      if (kelas7Sample.subTopics && kelas7Sample.subTopics.length > 0) {
        kelas7Sample.subTopics.forEach((st, idx) => {
          console.log(`  ${idx + 1}. "${st.title}" (${st.quiz ? st.quiz.length : 0} quiz)`);
        });
      }
    } else {
      console.log('⚠️  No Kelas 7 documents found!');
    }
    
    // 3. List semua dokumen dengan class dan title
    console.log('\n\n📋 ALL DOCUMENTS IN DATABASE:');
    console.log('─'.repeat(60));
    const allDocs = await collection.find({}).project({ 
      title: 1, 
      class: 1, 
      'subTopics.title': 1 
    }).toArray();
    
    allDocs.forEach(doc => {
      console.log(`\n📄 Class ${doc.class}: "${doc.title}"`);
      if (doc.subTopics && doc.subTopics.length > 0) {
        doc.subTopics.forEach((st, idx) => {
          console.log(`   ${idx + 1}. "${st.title}"`);
        });
      }
    });
    
    // 4. Cek apakah ada dokumen dengan subTopics.title = "Pengertian Bilangan Bulat"
    console.log('\n\n🔍 SEARCHING FOR "Pengertian Bilangan Bulat":');
    console.log('─'.repeat(60));
    const searchResult = await collection.find({
      class: 7,
      "subTopics.title": "Pengertian Bilangan Bulat"
    }).toArray();
    
    if (searchResult.length > 0) {
      console.log(`✅ Found ${searchResult.length} document(s):`);
      searchResult.forEach(doc => {
        console.log(`   - ${doc.title} (ID: ${doc._id})`);
      });
    } else {
      console.log('❌ NOT FOUND!');
      console.log('\n💡 Possible reasons:');
      console.log('   1. Title mismatch (case-sensitive, extra spaces)');
      console.log('   2. Wrong database/collection name');
      console.log('   3. Data not seeded yet');
    }
    
    // 5. Cek nama collection yang ada
    console.log('\n\n📦 AVAILABLE COLLECTIONS:');
    console.log('─'.repeat(60));
    const collections = await db.listCollections().toArray();
    collections.forEach(coll => {
      console.log(`   - ${coll.name}`);
    });
    
    console.log('\n' + '═'.repeat(60));
    console.log('✅ Debug check completed!');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
  }
}

debugDatabase();