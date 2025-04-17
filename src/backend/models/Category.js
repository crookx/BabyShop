import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: true
  },
  description: String,
  active: {
    type: Boolean,
    default: true
  }
});

export default mongoose.model('Category', categorySchema);