const express = require('express')
const app = express()

const ejs = require('ejs')
const mongoose = require('mongoose')
const path = require('path')


const methodOverride = require('method-override')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.set("view engine", 'ejs')

app.set("views", path.join(__dirname, "views"))

mongoose.connect('mongodb://127.0.0.1:27017/outpassmp')
.then(() => console.log("mongodb connected successfully"))
.catch((err) => console.log(`Mongo error ${err}`))

const Outpass = require('./models/outpass')
const Student =  require('./models/student')

const port = 3333;


app.get('/', (req, res) => {
    res.render('home')
})

app.get('/outpass/new', (req, res) => {
    res.render('outpass_form')
})


app.post('/outpass/new', async (req, res) => {

    try {

        //const { rollNumber} = req.body;


        const { rollNumber, reason } = req.body;

        var student = await Student.findOne({roll_no: rollNumber})

        if(student){
            var outpass = new Outpass({roll_no: rollNumber, reason: reason})
            student.outpasses.push(outpass)
            await student.save()
            await outpass.save()

        }
        else{

            const { studentName, studentMobile, parentMobile } = req.body;

            const student = new Student({roll_no: rollNumber, name: studentName, mobile: studentMobile, parent_mobile: parentMobile, outpasses: []})
            var outpass = new Outpass({roll_no: rollNumber, reason: reason})
            student.outpasses.push(outpass)
            await student.save()
            await outpass.save()
        }

        console.log(student)
        res.status(200).redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }

})

app.get('/outpass/search', async (req, res) => {

    res.render('search')
})

app.post('/outpass/search', async (req, res) => {

    try {

    const { rollNumber } = req.body;

    var student = await Student.findOne({roll_no: rollNumber})

    if(student){

        var student = await Student.findOne({roll_no: rollNumber})
        .populate('outpasses')

        var name = student.name
        var outpasses_list = student.outpasses; 
        console.log(outpasses_list)
        
        res.render('search_result', { outpass: outpasses_list, name: name }); 
    }
    else {

        var empty = 'empty'
        res.render('search_result', { outpass: {}, name: rollNumber }); 
    }


    // res.status(200).send('Outpass submitted successfully.');
} catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
}
})

// app.get('/test', async (req, res) => {

// try {

//     const student = new Student({roll_no: '12345', name: 'bunny', mobile: '12345', parent_mobile: '12345', outpasses: []})
//     const outpass = new Outpass({id: 1, roll_no: '12345', reason: 'summa'})
//     student.outpasses.push(outpass)
//     await student.save()
//     await outpass.save()
//     console.log(student)
//     res.status(200).send('Test data created successfully.');

// } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// })

// app.get('/testget', async (req, res) => {

//     Student.findOne({ roll_no: '12345'})
//     .populate('outpasses')
//     .then(student => console.log(student))
// })

app.listen(port, () => {
    console.log(`listening from port:${port}`)
})