const app = require('./app')

const port = 4500;
app.listen(port, () => {
    console.log(`App running at port : ${port}`);
});

