const express = require('express');
const router = express.Router();
const News = require('../models/News');
const { protect } = require('../middleware/auth');

// @GET /api/news - Get all published news (with pagination & filter)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const category = req.query.category;
    const search = req.query.search;
    const skip = (page - 1) * limit;

    let query = { isPublished: true };
    if (category && category !== 'All') query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const [news, total] = await Promise.all([
      News.find(query)
        .populate('author', 'name avatar')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      News.countDocuments(query)
    ]);

    res.json({
      success: true,
      news,
      pagination: {
        current: page,
        total: Math.ceil(total / limit),
        count: total,
        limit
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @GET /api/news/top - Get top 6 recent news
router.get('/top', async (req, res) => {
  try {
    const news = await News.find({ isPublished: true })
      .populate('author', 'name avatar')
      .sort({ views: -1, createdAt: -1 })
      .limit(6);

    res.json({ success: true, news });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @GET /api/news/my - Get current user's news
router.get('/my', protect, async (req, res) => {
  try {
    const news = await News.find({ author: req.user._id })
      .sort({ createdAt: -1 });

    res.json({ success: true, news });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @GET /api/news/:slug - Get single news
router.get('/:slug', async (req, res) => {
  try {
    const news = await News.findOneAndUpdate(
      { slug: req.params.slug, isPublished: true },
      { $inc: { views: 1 } },
      { new: true }
    ).populate('author', 'name avatar bio');

    if (!news) {
      return res.status(404).json({ success: false, message: 'News not found' });
    }

    // Get related news
    const related = await News.find({
      category: news.category,
      _id: { $ne: news._id },
      isPublished: true
    }).populate('author', 'name avatar').limit(4).sort({ createdAt: -1 });

    res.json({ success: true, news, related });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @POST /api/news - Create news
router.post('/', protect, async (req, res) => {
  try {
    const { title, content, excerpt, image, category, tags } = req.body;

    const news = await News.create({
      title,
      content,
      excerpt,
      image,
      category,
      tags: tags ? (Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim())) : [],
      author: req.user._id,
    });

    await news.populate('author', 'name avatar');

    res.status(201).json({ success: true, message: 'News published successfully', news });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @PUT /api/news/:id - Update news
router.put('/:id', protect, async (req, res) => {
  try {
    let news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({ success: false, message: 'News not found' });
    }

    if (news.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to edit this news' });
    }

    const { title, content, excerpt, image, category, tags, isPublished } = req.body;

    news.title = title || news.title;
    news.content = content || news.content;
    news.excerpt = excerpt || news.excerpt;
    news.image = image !== undefined ? image : news.image;
    news.category = category || news.category;
    news.tags = tags ? (Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim())) : news.tags;
    if (isPublished !== undefined) news.isPublished = isPublished;

    await news.save();
    await news.populate('author', 'name avatar');

    res.json({ success: true, message: 'News updated successfully', news });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @DELETE /api/news/:id - Delete news
router.delete('/:id', protect, async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({ success: false, message: 'News not found' });
    }

    if (news.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this news' });
    }

    await news.deleteOne();

    res.json({ success: true, message: 'News deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
