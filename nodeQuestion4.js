const fs = require('fs');
const request = require('request');
const async = require('async');
let pathFront = "./images/folder",
  dir;
const pathExtention = '.jpg';
const imgURL = [
  "https://doodleart.redbull.com/assets/managed/entries/processed/sm/367010617181759_36211000.jpg",
  "https://www.justcolor.net/wp-content/uploads/sites/1/nggallery/doodle-art-doodling/coloring-page-adults-doodle-art-rachel.jpg",
  "https://i.pinimg.com/originals/e5/55/a3/e555a39ca5457a079a9bcce59f61f8d5.jpg",
  "http://canhotopazelite.info/wp-content/uploads/2018/08/office-bay-decoration-themes-with-office-bay-decoration-themes-elegant-yet-fun-office-bay-decoration-14.jpg",
  "https://i.pinimg.com/originals/ef/4c/91/ef4c91fb73e61e19211a0589187ccaa6.jpg",
  "https://static.vecteezy.com/system/resources/previews/000/107/464/non_2x/huge-doodle-vector-pack.jpg",
  "https://i.ytimg.com/vi/O5u1apUkYV0/maxresdefault.jpg",
  "https://media.glassdoor.com/l/e9/c1/7a/84/independence-day-celebration.jpg"
]

let newDir = (i) => {
  if (!fs.existsSync(pathFront + i))
    fs.mkdirSync(pathFront + i);
  dir = pathFront + i + '/image';
}

let pathSet = (key) => {
  let path = parseInt(key / 5);
  newDir(path + 1);
  return dir + (key + 1) + pathExtention;
}

async.parallel(async.forEachOf(imgURL, (value, key, callback) => {
  console.log(key)
  options = {
    uri: value,
    encoding: 'binary'
  }
  request(options, (error, response, body) => {

    fs.writeFile(pathSet(key), body, 'binary',
      (err) => {
        if (err) console.log("err");
        else {
          console.log(dir + (key + 1) + pathExtention +
            " written!!");
        }
      })
    console.log("File: " + (key + 1) + pathExtention + " read");
  })
  callback();

}));