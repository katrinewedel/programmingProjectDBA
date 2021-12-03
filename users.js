var express = require('express');
var router = express.Router();
// userModel definerer at vi gerne vil bruger den klasse defineret under models
var userModel = require("./../models/users");
//userFile definerer hvor datafilen ligger henne
var userFile = "./data/users.json";
//fs = filesystem (use operations connected to filesystem)
var fs = require("fs");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', function(req, res, next) {
  try {
    //console log viser data sendt, i terminalen
    console.log(req);
    //funktionen fra frontenden sender data med i kaldet, som er en json struktur med en email og et password
    var newUser = new userModel(req.body.email, req.body.password);

    // usersRaw tager fs funktion og læser uformateret fil fra filsystemet (filen userFile)
    var usersRaw = fs.readFileSync(userFile);
    //Læs den her fil (usersRaw) som json-fil - den har omdannet det til et array, ved at læse det som JSON-fil (parse funktion, forstå filen som array)
    var users = JSON.parse(usersRaw); 

    //push funktion indsætter ny bruger (opretter bruger)
    //her skal indsættes check af om brugeren findes i forvejen
    users['users'].push(newUser);

    //stringify oversætter JSON array til tekst der kan gemmes (modsat parse) - null, 2 (gør det læseligt, simpelt)
    var newDataToSave = JSON.stringify(users,null, 2);
    // tager fs funktion og skriver data med den nye bruger tilbage til filen (læs, oversæt, indsæt ny bruger, oversæt tilbage, skriv tekst)
    fs.writeFileSync(userFile, newDataToSave);
    //returnerer status 200 (færdig)
    res.status(200).send(true);

  } catch (e) {
    //returnerer status 500 hvis der sker en fejl
    res.status(500).send(false);
    console.log('Error in Create User function:', e);

  }

});

router.post('/login', function(req, res, next) {
  var user = new userModel(req.body.email, req.body.password);
console.log(user);
  var usersRaw = fs.readFileSync(userFile);
  var users = JSON.parse(usersRaw);
console.log(users);
// sammenligner den tilhørende email til user med de emails der er oprettet i 'users' i JSON-filen
// Hvis den finder noget så logger den den user der er fundet
  var found = users.users.find((x) => user.email == x.email);
console.log(found);
//Hvis den bliver fundet, så tjekker den om password stemmer overens med user (email)
  if (found) {
    //Hvis det er sandt, så returnerer den 200
    if (user.password == found.password) {
      res.status(200).send(true);
      //Og i terminalen returnerer den følgende
      console.log('User login: Login successfull.')
      //Hvis ikke så returnerer den 401(unauthorised) med følgende tekst
    } else {
      res.status(401).send(false);
      console.log('User login: Password incorrect.')
    }
    //Hivs den ikke har fundet noget(at det ikke er sandt) så returnerer den 404, og skriver følgende
  } else {
    res.status(404).send(false);
    console.log('User login: Unknown user.')
  }
});

router.post('/delete', function(req, res, next) {
  var user = new userModel(req.body.email,req.body.password);
  var usersRaw = fs.readFileSync(userFile)
  var users = JSON.deleteUser(usersRaw);
  var found =users.users.find((x) => user.email == x.email);
  if (found) {
    deleteUser(email);
    res.redirect('/');
  }

});

  //Mads's kode
//   let username = req.session.username;
//   deleteUser(username);
//   res.redirect('/');
//   res.send('respond with a resource');
// });

// function deleteUser(username) {
//   for(var i=0; i< users.length; i++) {
//     if(users[i].username == username) {
//       users.splice(i,1);
//       break;
//     }
//   }
// }

// var user = new userModel(req.body.email, req.body.password);
// var users = fs.readFileSync(userFile)
// deleteUser(user);
// res.status(200).send(true);

router.post('/edit', function(req, res, next) {
  res.send('respond with a resource');

});
module.exports = router;
