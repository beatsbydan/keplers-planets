const { parse } = require('csv-parse');
const fs = require('fs');
const results = [];

const isHabitablePlanet = (planet) => {
    return planet['koi_disposition'] === 'CONFIRMED' 
    && planet['koi_insol'] > 0.36
    && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}

fs.createReadStream('kepler_data.csv')
    .pipe(parse({
        comment: '#', //Looks through the file and takes all lines with this characters '#' as comments
        columns: true //returns each row in our csv file as a js object
    }))
    .on('data', (data)=>{
        if(isHabitablePlanet(data)){
            results.push(data)
        }
    })
    .on('error', (error)=>{
        console.log(error)
    })
    .on('end', ()=>{
        console.log(`${results} habitable planets found!`)
        console.log('done')
    })