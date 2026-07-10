import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Inquiry from './models/Inquiry.js';
import Artwork from './models/Artwork.js';
import { sendInquiryNotification, sendConfirmationToInquirer } from './utils/emailService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true,
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/auragallery')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ─── INQUIRY ROUTES ───────────────────────────────────────────

// GET all inquiries
app.get('/api/inquiries', async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.status(200).json(inquiries);
  } catch (error) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// PATCH update inquiry status
app.patch('/api/inquiries/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Inquiry.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// POST new inquiry
app.post('/api/inquiries', async (req, res) => {
  try {
    const { fullName, email, subject, message, botcheck } = req.body;

    if (botcheck) return res.status(400).json({ error: 'Spam detected' });
    if (!fullName || !email || !subject || !message)
      return res.status(400).json({ error: 'All fields are required' });

    const newInquiry = new Inquiry({ fullName, email, subject, message });
    await newInquiry.save();

    Promise.all([
      sendInquiryNotification(newInquiry),
      sendConfirmationToInquirer(newInquiry),
    ]).catch((emailErr) => {
      console.error('⚠️  Email sending failed (inquiry still saved):', emailErr.message);
    });

    res.status(201).json({ message: 'Inquiry submitted successfully!', inquiry: newInquiry });
  } catch (error) {
    console.error('Error saving inquiry:', error);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

// ─── ARTWORK ROUTES ───────────────────────────────────────────

// GET all artworks
app.get('/api/artworks', async (req, res) => {
  try {
    const artworks = await Artwork.find().sort({ order: 1, createdAt: 1 });
    res.status(200).json(artworks);
  } catch (error) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// POST add new artwork
app.post('/api/artworks', async (req, res) => {
  try {
    const { title, medium, year, img, description, has360, additionalImages } = req.body;
    if (!title || !medium || !year || !img)
      return res.status(400).json({ error: 'Title, medium, year, and image URL are required.' });

    const count = await Artwork.countDocuments();
    const newArtwork = new Artwork({ title, medium, year, img, description, has360, additionalImages, order: count });
    await newArtwork.save();
    res.status(201).json(newArtwork);
  } catch (error) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// DELETE artwork
app.delete('/api/artworks/:id', async (req, res) => {
  try {
    await Artwork.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Artwork deleted.' });
  } catch (error) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// PATCH update artwork
app.patch('/api/artworks/:id', async (req, res) => {
  try {
    const { title, medium, year, img, description, has360, additionalImages } = req.body;
    const updated = await Artwork.findByIdAndUpdate(
      req.params.id,
      { title, medium, year, img, description, has360, additionalImages },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Artwork not found.' });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// ─── START SERVER ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
