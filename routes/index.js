exports.index = function(req, res){
    var message = '';
  res.render('index',{message: message});
 
};

exports.cam1 = function(req, res){
  var message = '';
res.render('cam1',{message: message});

};