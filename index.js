const { parse } = require('csv-parse')
const fs = require('fs')
const results = []

fs.createReadStream('kepler_data.csv')
    .pipe(parse({
        comment: '#', //Looks through the file and takes all lines with this characters '#' as comments
        columns: true //returns each row in our csv file as a js object
    }))
    .on('data', (data)=>{
        results.push(data)
    })
    .on('error', (error)=>{
        console.log(error)
    })
    .on('end', ()=>{
        console.log(results)
        console.log('done')
    })