import mongoose from 'mongoose'

mongoose.connect("mongodb+srv://admin:1s7mQZBlDpkeCuxp@test.o5igj.mongodb.net/test?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser:true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(db => console.log('DB is connected'))
.catch(error => console.log(error))