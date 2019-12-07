const express = require('express')
const bp = require('body-parser')
const mysql = require('mysql')
const path = require('path')
const md5 = require('md5')
const alert = require('alert-node')
var cookieParser = require('cookie-parser');

app = express()
    .set('view engine', 'ejs')
    .use('/public', express.static(__dirname + '/public'))
    .use('/js', express.static(__dirname + '/js'))
    .use('/Img', express.static(__dirname + '/Img'))
    .use(bp.urlencoded({ extended: true }))
    .use(cookieParser())

const conDB = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "123456789",// 123456789,
    database: "mydb"
    
    //ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456789'
})

conDB.connect(function(err) {
	if (err) throw err
	console.log("DB has been connected!")

	// const sql2 = "INSERT INTO users (email, password, uid) VALUES ('albert.krdoyan@mail.ru', '" + md5("albert") + "', '1234567890')"
	// conDB.query(sql2, function (err, result) {
	// 	if (err) throw err
	// })

    // const sql1 = "SELECT * FROM users"
	// conDB.query(sql1, function (err, result) {
	// 	if (err) throw err
	// 	console.log(result)
	// })
})

app.listen(8080, '127.0.0.1', ()=>{
	console.log('Server started on localhost:8080')
})

app.get('/login_', (req, res) =>{
    if(req.cookies['username'] != undefined && req.cookies['username'] != "~"){
        if(true){
            res.render(__dirname + "\\view\\profile.ejs")
        }
    }else{
        res.render(__dirname + "\\view\\login_page.ejs")
    }
})

app.get('/registration_', (req, res) =>{
    if(req.cookies['username'] != undefined && req.cookies['username'] != "~"){
        if(true){
            res.render(__dirname + "\\view\\profile.ejs")
        }
    }else{
        res.render(__dirname + "\\view\\reg_page.ejs")
    }
})

app.get('/', (req, res) =>{
    if(req.cookies['username'] != undefined && req.cookies['username'] != "~"){
        if(true){
            res.render(__dirname + "\\view\\profile.ejs")
        }
    }else{
        res.render(__dirname + "\\view\\main_page.ejs")
    }
})

app.post('/registration_n', (req, res)=>{
    if(req.cookies['username'] != undefined && req.cookies['username'] != "~"){
        if(true){
            res.render(__dirname + "\\view\\profile.ejs")
        }
    }else{
        let pass = req.body.pass
        let c_pass = req.body.c_pass
        let usern = req.body.username

        if(pass.length == 0){
            res.end("password error")
        }else if(pass == c_pass){

            const sql1 = "SELECT * FROM users where username = '" + usern + "';"
            conDB.query(sql1, function (err, result) {
                if (err) throw err
                if(result.length == 0){
                    const sql2 = "INSERT INTO users (username, password, uid, connect) VALUES ('" + usern + "', '" + md5(pass) + "', '" + md5(usern) +  "', 0)"
                    conDB.query(sql2, function (err, result) {
                        if (err) throw err
                        else{
                            res.cookie('reg_username', usern)
                            res.cookie('reg_usid', 'a' + md5(usern))
                        }
                        res.render(__dirname + "\\view\\reg_page2.ejs")
                    })
                } else {
                    alert("This username already exist.")
                    res.render(__dirname + "\\view\\reg_page.ejs")
                }
            })
        }else {
            alert("The passwords don't coincide.")
            res.render(__dirname + "\\view\\reg_page.ejs")
        }
    }
})

app.post('/registration_n2', (req, res)=>{
    if(req.cookies['username'] != undefined && req.cookies['username'] != "~"){
        if(true){
            res.render(__dirname + "\\view\\profile.ejs")
        }
    }else{
        let user = req.cookies['reg_username'].toString(), us_id = req.cookies['reg_usid'].toString()
        
        res.clearCookie('reg_username')
        res.clearCookie('reg_usid')

        var id = setInterval(frame, 1);
        function frame() {
            if(user != 0 && us_id != 0){
                clearInterval(id)
            }
        }

        let finish = [false, false, false]

        let v = (Math.random() * Math.pow(10, 17)).toString(20) + (Math.random() * Math.pow(10, 17)).toString(20) + (Math.random() * Math.pow(10, 17)).toString(20) + (Math.random() * Math.pow(10, 17)).toString(20) + (Math.random() * Math.pow(10, 17)).toString(20) + (Math.random() * Math.pow(10, 17)).toString(20) + (Math.random() * Math.pow(10, 17)).toString(20) + (Math.random() * Math.pow(10, 17)).toString(20)

        const sql1 = "UPDATE users SET connect = 1 WHERE username = '" + user + "'"

        conDB.query(sql1, function (err, result) {
            if (err) console.log( "1 " +  err )
            else finish[0] = true
        })

        const sql2 = "CREATE TABLE `" + us_id + "` (`name` text not null, `rest` text NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=latin1;"

        conDB.query(sql2, function (err, result) {
            if (err) console.log( "2 " +  err )
            else finish[1] = true
        })

        const sql3 = "INSERT INTO " + us_id + " (name, rest) VALUES ('" + req.body.name + "', '" + v + "');"

        conDB.query(sql3, function (err, result) {
            if (err) console.log( "3 " +  err )
            else finish[2] = true
        })

        var id2 = setInterval(frame2, 1);
        function frame2() {
            let ok = 0;
            for(let i = 0; i < 3; ++i){
                if(finish[i] == true){
                    ++ok;
                }
            }
            if(ok == 3){
                clearInterval(id2)
                finish[0] = finish[1] = finish[2] = false
                user = us_id = 0
                res.end('okay')
            }
        }

        res.render(__dirname + "\\view\\main_page.ejs")
    }
})

app.post('/login_n', (req, res) =>{    
    if(req.cookies['username'] != undefined && req.cookies['username'] != "~"){
        if(true){
            res.render(__dirname + "\\view\\profile.ejs")
        }
    }else{
        new Promise((resolve, reject) =>{
            conDB.query("select * from users where username = '" + req.body.username + "' and password = '" + md5(req.body.password) + "';", (err, result)=>{
                if(result.length != 0){
                    res.cookie('username', result[0].username)
                    res.cookie('uid', result[0].uid)
                    resolve("Okay")
                }else{
                    reject("The user don't found.")
                }
            })
        }).then((message) =>{
            new Promise((resolve, reject)=>{
                conDB.query("select * from a" + md5(req.body.username), (err2, result2)=>{
                    if(result2.length != 0){
                        res.cookie('name', result2[0].name)
                        res.cookie('r_code', result2[0].rest)
                        res.render(__dirname + "\\view\\profile.ejs")
                    }
                })
            }).catch(()=>{
                res.render(__dirname + "\\view\\login_page.ejs")
            })
        }).catch((message) =>{
            res.render(__dirname + "\\view\\login_page.ejs")
        })
    }
})

app.post('/profile_data', (req, res)=>{
    let data = []
    let d

    try{
        data[0] = req.cookies['username'].toString()
        data[1] = req.cookies['uid'].toString()
        data[2] = req.cookies['name'].toString()
        data[3] = req.cookies['r_code'].toString()
    
        d = data[0] + ' ' + data[1] + ' ' + data[2] + ' ' + data[3]
    }catch(msg){
        d = 'empty data'
    }

    res.end(d)
})

app.get('/profile', (req, res) =>{

    if(req.cookies['username'] == undefined || req.cookies['username'] == "~"){
        if(true){
            res.render(__dirname + "\\view\\login_page.ejs")
        }
    }else{
        res.render(__dirname + "\\view\\profile.ejs")
    }
})