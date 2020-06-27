const app = require('./app');
const mongoose = require('mongoose');

const port = 4500;
app.listen(port, () => {
    console.log(`App running at port : ${port}`);
<<<<<<< HEAD
});

//+++=========================-------====CONNECT-----DATA----BASE======--------===================+++//
mongoose.connect('mongodb://127.0.0.1:27017/restaurant', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(() => {
        console.log('Restaurant data base is connected ');
    });
=======
});
>>>>>>> 208a896b52cb617dc2fe264b1c1c7b1e425d753d
