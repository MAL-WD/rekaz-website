require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const Admin = require('./models/Admin');

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const existing = await Admin.findOne({ email: 'admin@rekaz.dz' });
    if (existing) {
      console.log('Admin user already exists. Skipping seed.');
    } else {
      await Admin.create({
        email: 'admin@rekaz.dz',
        password: 'rekaz2026',
        name: 'Rēkāz Admin'
      });
      console.log('Admin user created: admin@rekaz.dz / rekaz2026');
    }

    await mongoose.disconnect();
    console.log('Done.');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err.message);
    process.exit(1);
  }
};

seed();
