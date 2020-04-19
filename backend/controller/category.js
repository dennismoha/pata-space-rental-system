const Category = require('../model/category');





const createCategory = (req,res)=> {
	req.checkBody('name','name cannot be empty').notEmpty()

	var title = req.body.name;
	var sep = title.replace('/\s+/g','-').toLowerCase();

	var errors = req.validationErrors();
				if(errors) {
					var messages = [];
					errors.forEach(function(error) {
							messages.push(error.msg)
						})	
						req.flash('error',messages)
						console.log(messages)
					res.render('Admin/create_category',{messages: req.flash('error')})			
				}

	Category.findOne({sep:sep},(err,category)=> {
					if(category) {
						req.flash('error','category exists');
						res.render('Admin/create_category',{messages:req.flash('error'),name:req.body.name})
					}else {

						const category = new Category({
								name:req.body.name,					
								sep: sep
					
						});

							console.log('this is the category',category)

				category.save().then((category)=> {
					if(category) {

							Category.find().then((category)=> {
							  if(category) {
							    req.app.locals.category = category
							  }
							}).catch((error)=> {
							  throw error
							})

						req.flash('info','category successfully created')
						// res.render('admin/pages',{page:page,message:req.flash('info')})
						res.render('Admin/view_categories',{category:category})
							}
					}).catch((error)=> {
						throw error
							})

					}
				})
}




const getCategories = (req,res) => {
	Category.find().then(
		(category)=> {
			if(category) {
				console.log('category')
				res.render("Admin/all_categories",{category:category})
			}
		}).catch(
		(error)=> {
			throw error;
			console.log('error getting all categories',error)
		})
}

const category_edit = (req,res) => {
	const category = new Category({
    _id: req.params.id,
    name: req.body.name,
   
  });
  Category.updateOne({_id: req.params.id},category).then(
    () => {
     res.redirect('/category/category/get_category')
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
}

module.exports = {createCategory,getCategories}
