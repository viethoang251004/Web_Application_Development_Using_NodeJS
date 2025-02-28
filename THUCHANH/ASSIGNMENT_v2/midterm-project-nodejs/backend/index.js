const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://mongodb:27017/todoDB', { serverSelectionTimeoutMS: 20000 }) // 20 seconds
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));


const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    description: {
        type: String,
        required: false
    },
    dueDate: {
        type: Date,
        required: false
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const Task = mongoose.model('Task', taskSchema);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'frontend')));

app.get('/api/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

app.post('/api/tasks', async (req, res) => {
    const { name, description, dueDate, priority, completed } = req.body;
    const task = new Task({
        name,
        description,
        dueDate,
        priority,
        completed
    });
    try {
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send('Lỗi khi lưu công việc: ' + error.message);
    }
});

app.get('/', (req, res) => {
    res.render('index');
});

app.put('/api/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, dueDate, priority, completed } = req.body;

    try {
        const task = await Task.findByIdAndUpdate(
            id,
            { name, description, dueDate, priority, completed },
            { new: true, runValidators: true }
        );
        if (!task) return res.status(404).json({ error: 'Công việc không tồn tại' });

        res.json(task);
    } catch (error) {
        res.status(400).json({ error: 'Lỗi khi cập nhật công việc: ' + error.message });
    }
});

app.delete('/api/tasks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findByIdAndDelete(id);
        if (!task) return res.status(404).send('Công việc không tồn tại');
        res.send(task);
    } catch (error) {
        res.status(500).send('Lỗi máy chủ');
    }
});

app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}/`);
});
