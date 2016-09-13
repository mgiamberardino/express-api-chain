module.export = function(router){
  return {
    handler: function (req, res, next){
      var endFunction = res.end;
      var encoding;
      res.end = function(body, encoding){
        /*Here we have to save the response from an endpoint to pass the arguments
        to the next one. The first approach is to pass the entire body.*/
        req.body = body;
        this.encoding = encoding;
      };

      /*Here we have to run the chain*/

      /*Finally we have to use the original "end()" function to send the
      response*/
      res.end = endFunction;
      res.send(/*body of the response*/);
    },
    isAuthorized: function(req, res){
      return true;
    },
    secure: function(authorize){
      this.isAuthorized = authorize;
      return this;
    }
  }
};
