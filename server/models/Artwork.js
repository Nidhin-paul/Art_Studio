import mongoose from 'mongoose';

const artworkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxLength: 150,
  },
  medium: {
    type: String,
    required: true,
    trim: true,
    maxLength: 150,
  },
  year: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
    maxLength: 1000,
  },
  has360: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
    default: 0,
  }
}, {
  timestamps: true,
});

const Artwork = mongoose.model('Artwork', artworkSchema);
export default Artwork;
