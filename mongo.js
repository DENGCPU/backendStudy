const mongoose  = require('mongoose');

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://imdj1996:${password}@cluster0.7qq6f.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        minlength: 5
    },
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
    content: '我在使用mongodb创建note',
    important: true,
})

// note.save().then(result => {
//     console.log('note saved!')
//     mongoose.connection.close()
// })

// 获取所有note数据
Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})
