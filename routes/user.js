
var bcrypt = require('bcrypt');

exports.signup = function(req, res){

   var user =  req.session.user,
   userId = req.session.userId;
   console.log('ddd='+userId);
   if(userId == null){
      res.redirect("/login");
      return;
   }

   message = '';
   if(req.method == "POST"){
      var post  = req.body;
      var name= post.user_name;
      var pass= post.password;
      var fname= post.first_name;
      var lname= post.last_name;
      var mob= post.mob_no;
      var email= post.email;
      var salt = 5;

      const cont = bcrypt.hashSync (pass, salt); 
      
      var sql = "INSERT INTO `users`(`nombre`,`apellido`,`movil`,`user_name`, `password`,`email`) VALUES ('" + fname + "','" + lname + "','" + mob + "','" + name + "','" + cont + "','" + email + "')";

      var query = db.query(sql, function(err, result) {
         console.log(err,result);
         message = "El usuario se creo correctamente.";
         res.render('signup.ejs',{message: message});
      
      });
      

   } else {
      res.render('signup');
   }
};
 
exports.login = function(req, res){
   var message = '';
   var sess = req.session; 

   if(req.method == "POST"){
      var post  = req.body;
      var name= post.user_name;
      var pass= post.password;

      var sql="SELECT id, nombre, apellido, user_name, password FROM `users` WHERE `user_name`='"+name+"'";                           
      db.query(sql, function(err, results){      
         if(results.length){
            var check = results[0].password;
            bcrypt.compare(pass, check, (err, ok) => {
               console.log(ok);
               if(ok == true)
               {
                  req.session.userId = results[0].id;
                  req.session.user = results[0];
                  res.redirect('/home/dashboard');
                  console.log(ok);
               }
               else
               {
               message = 'Contraseña Incorrecta';
               res.render('index.ejs',{message: message});
               }
             });
            }
         else{
            message = 'Usuario  Incorrecto';
            res.render('index.ejs',{message: message});
         }
                 
      });
   } else {
      res.render('index.ejs',{message: message});
   }
           
};
           
exports.dashboard = function(req, res, next){
           
   var user =  req.session.user,
   userId = req.session.userId;
   console.log('ddd='+userId);
   if(userId == null){
      res.redirect("/login");
      return;
   }

   var sql="SELECT * FROM `users` WHERE `id`='"+userId+"'";

   db.query(sql, function(err, results){
      res.render('dashboard.ejs', {user:user});    
   });       
};
exports.logout=function(req,res){
   req.session.destroy(function(err) {
      res.redirect("/login");
   })
};

exports.profile = function(req, res){

   var userId = req.session.userId;
   if(userId == null){
      res.redirect("/login");
      return;
   }

   var sql="SELECT * FROM `users` WHERE `id`='"+userId+"'";          
   db.query(sql, function(err, result){  
      res.render('profile.ejs',{data:result});
   });
};

exports.editprofile=function(req,res){
   var userId = req.session.userId;
   if(userId == null){
      res.redirect("/login");
      return;
   }

   var sql="SELECT * FROM `users` WHERE `id`='"+userId+"'";
   db.query(sql, function(err, results){
      res.render('edit_profile.ejs',{data:results});
   });
};
