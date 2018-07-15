var messages = require('../controllers/messagesController.js');

module.exports = function(app){

  app.post('/sendMessage', function(req, res){
    messages.send(
      req.body.recipient,
      req.body.subject,
      req.body.body,
      req.body.date,
      req.session.user.idUsers
    ).then(() => {res.status(200).send('ok')})
  });


  app.get('/getMessages', function(req, res){
    messages.getMessages(
      req.session.user.idUsers
    ).then((data) => {res.status(200).send(data)})
  });

  app.get('/getMessage', function(req, res){
    messages.getMessage(
      req.session.user.idUsers,
      req.query.id
    ).then((data) => {
      messages.checkMessage(
        req.session.user.idUsers,
        req.query.id
      );
      res.status(200).send(data);
    });
  });

  app.post('/deleteMessages', function(req, res){
  
    messages.deleteMessages(
      req.session.user.idUsers,
      req.body.messages
    ).then(() => res.status(200).send('ok'));
  });

  app.get('/getSentMessages', function(req, res){
    messages.getSentMessages(
      req.session.user.idUsers
    ).then(data => res.status(200).send(data))
  })


}
