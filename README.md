/*
issues encountered:
	1) adding a role based to both landlord and user module incase the passport authentication fails
	2) adding route security => isLandlord middleware function to secure non admins from accessing it.
	3) do we need more than two passport js authentication files??  no Answer -> try write a new authentication
		for the admin like that of the user and check incase of any errors in passport user login authentication.
		check the priviliges a logged in user is given if he can access the landlord routes


admin priviliges
	== admin can add user /agent
	== admin can delete user 
	== admin can delete comment
	== admin can delete property
	== admin can update user details
	== admin can view all users
	== admin can add about and contact page

	// var db = new mongo.Db('pata_space', new mongo.Server("127.0.0.1", 27017));
// db.open(function (err) {
//   if (err) return handleError(err);
//   var gfs = Grid(db, mongo);
//   gfs.collection('uploads')
  
// })

// var storage = new GridFsStorage({
//   url: 'mongodb://host:27017/pata_space',
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err);
//         }
//         const filename = buf.toString('hex') + path.extname(file.originalname);
//         const fileInfo = {
//           filename: filename,
//           bucketName: 'uploads'
//         };
//         resolve(fileInfo);
//       });
//     });
//   }
// });


property page
	shows property for each landlord..
	small house pic, then on clicking the picture ,it should redirect you to the homepage where you can see all the other pics of that property posted by the landlord.
	besides that, you can have the option to text the landlord or engage him in a conversation through a chat mode we'll enable via socket.io
	besides that, there will be user reviews.
	if the user clicks on the company profile, it should redirect him to the landlord profile page consisting of all the properties he has posted and each property with a user reviews

	the houses can have stars??????

	//on the property page..all the images should be links and clickable that takes you to each show page




	<div class="container" >
    <!-- Example row of columns -->
    <div class="row">
    	<% property.forEach(function(property){%>
      <div class="col-md-4">
        <h2><%= property.title %></h2>
        <div style="height: 150px;width: 150px;background-color: grey;position: relative;left: 150px;"> 
            <img src="">
        </div>
        <p> <%= property.description %></p>
        <p><a class="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>
      </div>  
       <% }) %>   
    </div>

    <hr>

  </div> <!-- /container -->



picture not added to db..if pic added? show page will be created and everything will be more clear


add pic to db, one of them should display on the property page with a .url that takes you to the show id page
 ..

 landing page requires a new query that queries both properties and user reviews and agents

 adding the user reviews section