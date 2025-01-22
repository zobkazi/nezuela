import { Schema, model, models } from 'mongoose';

// Define the Blog schema
const blogSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        minlength: [5, 'Title must be at least 5 characters'],
        maxlength: [255, 'Title must be at most 255 characters'],

    },
    content: {
        type: String,
        required: [true, 'Content is required'],
        trim: true,
        minlength: [5, 'Content must be at least 5 characters'],
        maxlength: [2558098, 'Content must be at most 2558098 characters '],

    },
    author: {
        type: String,
        required: [true, 'Author is required'],
        trim: true,
    },
    category: {
        type: String,
        enum: ['TECHNOLOGY', 'DESIGN', 'LIFESTYLE', 'BUSINESS'],
        required: [true, 'Category is required'],
        default: 'TECHNOLOGY',
        trim: true,
    },
    tags: {
        type: [String],
        default: [],
    },
    isPublished: {
        type: Boolean,
        default: false,
    },
    featuredImage: { // Add a field for a featured image URL
        type: String,
        default: 'https://placehold.co/600x400',
        
      },
});

// Prevent model overwrite during development
const Blog = models.Blog || model('Blog', blogSchema);

export default Blog;
