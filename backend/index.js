const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();
const PORT = 4000;
const userRoutes = express.Router();
const vendorRoutes = express.Router();
const productRoutes = express.Router();
const orderRoutes = express.Router();
const ratingRoutes = express.Router();

let User = require('./models/user');
let Vendor = require('./models/vendor')
let Product = require('./models/product')
let Order = require('./models/order')
let Rating = require('./models/rating')

app.use(cors());
app.use(bodyParser.json());

// Connection to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/db', { useUnifiedTopology: true,useNewUrlParser: true, useFindAndModify: false });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established succesfully.");
})

// API endpoints

// Getting all the users
userRoutes.route('/users').get(function(req, res) {
    // console.log('1')
    User.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

// Adding a new user
userRoutes.route('/useradd').post(function(req, res) {
    // console.log('2')
    User.find({
        email: req.body.email
    }, (err, users) => {
        if(err) {
            res.send({
                message: 'server error'
            })
            return ;
        }
        if(users.length > 0) {
            res.send({
                message: 'User already registered.'
            })
            return ;
        }
    let user = new User(req.body);
    user.save()
        .then(user => {
            res.send({
                message: 'User Added'
            });
        })
        .catch(err => {
            res.status(400).send('Error');
        });


    })
});

userRoutes.route('/usercheck').post(function(req,res) {
    // console.log(req.body)
    User.find({
        email: req.body.email,
        password: req.body.password
    }, (err, users) => {
        if(err) {
            res.send({
                message: 'server error'
            })
            return ;
        }
        if(users.length < 1) {
            res.send({
                message: 'No such user found'
            })
            return ;
        }
        res.send({
            message: 'Confirmed'
        })
    })
})



// Getting a user by id
userRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    User.findById(id, function(err, user) {
        res.json(user);
    });
});

//////////////////////////////////////////////////////////////////////////////////////////////////


vendorRoutes.route('/vendors').get(function(req, res) {
    // console.log('1')
    Vendor.find(function(err, vendors) {
        if (err) {
            console.log(err);
        } else {
            res.json(vendors);
        }
    });
});

// Adding a new user
vendorRoutes.route('/vendoradd').post(function(req, res) {
    // console.log('2')
    Vendor.find({
        email: req.body.email
    }, (err, vendors) => {
        if(err) {
            res.send({
                message: 'server error'
            })
            return ;
        }
        if(vendors.length > 0) {
            res.send({
                message: 'Vendor already registered.'
            })
            return ;
        }
    let vendor = new Vendor(req.body);
    vendor.save()
        .then(vendor => {
            const newb = {
                vendor: req.body.email,
                rate: [],
                review: []
            }
            let rating = new Rating(newb)
            rating.save()
            .then(rating => {
                res.send({
                    message: 'User Added'
                })
                return ;
            })
            .catch( err => {
                res.status(400).send('Error');
                return ;
            })     
        })
        .catch(err => {
            res.status(400).send('Error');
            return ;
        });
    })
});

vendorRoutes.route('/vendorcheck').post(function(req,res) {
    // console.log(req.body)
    Vendor.find({
        email: req.body.email,
        password: req.body.password
    }, (err, vendors) => {
        if(err) {
            res.send({
                message: 'server error'
            })
            return ;
        }
        if(vendors.length < 1) {
            res.send({
                message: 'No such vendor found'
            })
            return ;
        }
        res.send({
            message: 'Confirmed'
        })
    })
})

// Getting a vendor by id
vendorRoutes.route('/:id').get(function(req, res) {
    // console.log('3345')
    let id = req.params.id;
    Vendor.findById(id, function(err, vendor) {
        res.json(vendor);
    });
});

//////////////////////////////////////////////////////////////////////////////////

productRoutes.route('/products').get(function(req, res) {
    Product.find(function(err, products) {
        if (err) {
            console.log(err);
        } else {
            res.send(products);
        }
    });
});

// Adding a new user
productRoutes.route('/productadd').post(function(req, res) {
   
    let product = new Product(req.body);
    product.save()
        .then(product => {
            res.status(200).json({'Product': 'Product added successfully'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});

productRoutes.route('/productshow').post(function(req, res) {
//    console.log('2')
    Product.find({
        vendor: req.body.vendor
    }, (err,products) => {
            if(err) {
                console.log(err)
            }
            else {
                console.log(products),
                res.json(products)
            }
        }
    )
});

productRoutes.route('/productdisplay').post(function(req, res) {
    Product.find({

    },  (err, products) => {
        if (err) {
            console.log(err);
        } else {
            // console.log(products)
            res.json(products);
        }
    });
});

productRoutes.route('/productdispatch').post(function(req, res) {
    // console.log('2')
    var newvalues = { $set: {status: "Dispatched"} };
        Product.updateOne({
            _id: req.body.id}
        , newvalues , (err,products) => {
                if(err) {
                    console.log(err)
                }
                else {
                    // console.log('dispatched')
                    // products.status = 'Dispatched',
                    res.send({
                        message: "Dispatched"
                    })      
                }
            }
        )
    });

    productRoutes.route('/productupdate').post(function(req, res) {
        // console.log(req.body.orderquantity)
        var num = Number(req.body.orderquantity)
        // console.log(num)
        var num1 = Number(req.body.id.remaining)
        // console.log(num1)
        var newvalues = { $set: {remaining: num1 - num} };
        // console.log(req.body.id._id)
            Product.updateOne({
                _id: req.body.id._id}
            , newvalues , (err,products) => {
                    if(err) {
                        console.log(err)
                    }
                    else {
                        // console.log('updated')
                        // products.status = 'Dispatched',
                        res.send({
                            message: "Updated"
                        })      
                    }
                }
            )
        });

productRoutes.route('/productremove').post(function(req, res) {
    var newvalues = { $set: {status: 'Cancelled'} };
    Product.updateOne({ 
        _id : req.body.id
    },  newvalues, (err, products) => {
        if (err) {
            console.log(err)
        } 
        else {
            console.log(products)
            res.send({
                message: 'Cancelled'
            })
        }
    });
});

productRoutes.route('/:id').get(function(req, res) {
    // console.log('3345')
    let id = req.params.id;
    Product.findById(id, function(err, product) {
        res.json(product);
    });
});

////////////////////////////////////////////////////////////////

orderRoutes.route('/productorder').post(function(req, res) {
    const modi = {
        vendor: req.body.id.vendor,
        product: req.body.id.product,
        productid : req.body.id._id ,
        quantity : req.body.orderquantity,
        price : req.body.id.price,
        useremail : req.body.email,
        status: req.body.id.status,
        remaining: req.body.id.remaining,
        vendorrated: req.body.vendorrated,
        orderrated: req.body.orderrated,
        vendorrating: req.body.vendorrating
    }
    console.log(modi)
    let order = new Order(modi);
    order.save()
        .then(vendor => {
            res.send({
                message: 'Ordered'
            });
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});

orderRoutes.route('/orderupdate').post(function(req, res) {
    // console.log(req.body.useremail)
    // console.log('1')
    Order.find({
        useremail: req.body.useremail
    }, async (err,orders) => {
    // console.log('2') 
            for(var i=0; i < orders.length; i++)
            {
                var y = orders[i]._id
                var oid = orders[i].productid
                var xx = 0
                // console.log(y)
                // console.log(oid)    
                
                await Product.find({
                    _id: oid
                }, (err,products) => {
                    xx = Number(products[0].remaining)
                    // console.log(i,'x',xx)
                    // console.log(products[0].status)
                    var newvalues = { $set: {remaining: xx, status: products[0].status } };
                    // console.log(newvalues)
                    Order.updateOne({
                        _id: y}
                        , newvalues , (err,products1) => {
                            if(err) {
                                console.log(err)
                                return res.send( {
                                    message: 'error'
                                })
                            }
                            else {
                                // console.log('********************************** ')                                
                            }
                            // console.log(orders[0].remaining)    
                        }
                        )
                        
                    }
                    )
                    }
            return res.send({
                message: "Updated"
            })
            console.log('4')
        })
    })

orderRoutes.route('/ordershow').post(function(req, res) {
    //    console.log('243')
        Order.find({
            useremail: req.body.useremail
        }, (err,orders) => {
                if(err) {
                    console.log(err)
                }
                else {
                    // console.log(orders),
                    res.json(orders)
                }
            }
        )
    });



orderRoutes.route('/orderedit').post(function(req, res) {
    // console.log(req.body.orderquantity)
    var num = Number(req.body.quantity)
    // console.log(num)
    var num1 = Number(req.body.id.remaining)
    // console.log(num1)
    var num2 = Number(req.body.id.quantity)
    var newvalues = { $set: {quantity: num, remaining: num1 - num + num2} };
        Order.updateOne({
            _id: req.body.id._id}
        , newvalues , (err,products) => {
                if(err) {
                    console.log(err)
                }
                else {
                    Product.updateOne({
                        _id: req.body.id.productid}
                    , newvalues , (err,products) => {
                            if(err) {
                                console.log(err)
                            }
                            else {
                                // console.log('Edited')
                                res.send({
                                    message: "Edited"
                                })      
                            }
                        }
                    )    
                }
            }
        )
    }
);

ratingRoutes.route('/vendorrate').post(function(req, res) {
    var newvalues = { $set: {vendorrated: 1}};
    // console.log('xx')
    Order.updateOne({
        _id: req.body.id._id
    }, newvalues, (err,orders) => {
    }
    )
    Product.find({
        _id: req.body.id.productid
    }, (err, products) => {
        if(err){
            console.log(err)
        }
        else{
            var xx = products[0].vendor
            // console.log(xx)
            // console.log(req.body.rate)
            // var chn = {rate: req.body.rate}
            Rating.findOneAndUpdate({
                vendor: xx
            }, { $push: {rate: req.body.rate }},{new: true, upsert: true}, (err,vendors) =>{
                if(err){
                    // console.log(err)
                    return ;
                }
                else{
                    // console.log('Rated')
                    res.send({
                        message: "Rated"
                    })
                    return ;
                }
            }
            )
        }
    }
    )
});

ratingRoutes.route('/orderreview').post(function(req, res) {
    var newvalues = { $set: {orderrated: 1}};
    // console.log('xx')
    Order.updateOne({
        _id: req.body.id._id
    }, newvalues, (err,orders) => {
    }
    )
    Product.find({
        _id: req.body.id.productid
    }, (err, products) => {
        if(err){
            console.log(err)
        }
        else{
            var xx = products[0].vendor
            // console.log(xx)
            // console.log(req.body.review)
            // var chn = {rate: req.body.rate}
            Rating.findOneAndUpdate({
                vendor: xx
            }, { $push: {review: req.body.review }},{new: true, upsert: true}, (err,vendors) =>{
                if(err){
                    console.log(err)
                    return ;
                }
                else{
                    // console.log('Reviewed')
                    res.send({
                        message: "Reviewed"
                    })
                    return ;
                }
            }
            )
        }
    }
    )
});

ratingRoutes.route('/vendorshow').post(function(req, res) {
    // console.log('245')
    // console.log(req.body.index.vendor)
     Rating.find({
         vendor: req.body.index.vendor
     }, (err,ratings) => {
             if(err) {
                 console.log(err)
             }
             else {
                //  console.log(ratings[0].vendor)
                var mydata = []
                //  console.log(ratings[0])
                //  console.log(ratings[0].rate)
                // return (ratings[0].rate);
                res.send(ratings[0].review)
                // for(var i=0;i<ratings[0].review.length; i++)
                // {   
                    // mydata.push(ratings[0].review[i])
                // }
                //  res.json(mydata)
             }
         }
     )
 });

 ratingRoutes.route('/getrating').post(function(req, res) {
    // console.log('243')
    // console.log(req.body.index.vendor)
     Rating.find({
        //  vendor: req.body.index.vendor
     }, (err,ratings) => {
             if(err) {
                 console.log(err)
             }
             else {
                 var px = ratings.length
                //  console.log(px)
                //  console.log(ratings[0].vendor)
                // var mydata = []
                //  console.log(ratings[0])
                //  console.log(ratings[0].rate)
                // return (ratings[0].rate);
                // res.send(ratings[0].review)
                for(var j = 0; j < px; j++){
                var avg = 0
                var sum = 0
                for(var i=0;i<ratings[j].rate.length; i++)
                {   
                    // mydata.push(ratings[0].review[i])
                    sum += ratings[j].rate[i];
                }
                if(ratings[j].rate.length != 0){
                avg = sum/(ratings[j].rate.length);
                }
                else{
                avg = 0
                }
                // console.log(avg);
                // return ;
                var vname = ratings[j].vendor;
                var newvalues = { $set:{vendorrating: avg}}
                Product.updateMany({
                    vendor: vname
                }, newvalues, (err,orders) => {
                    // return ;
                }
                )
                // return ;
            }
            return ;
                // res.send({
                    // ans: avg
                // })
                // res.send({
                    // message: "Updated"
                // })
             }
         }
     )
 });

app.use('/', userRoutes);
app.use('/',vendorRoutes);
app.use('/',productRoutes);
app.use('/',orderRoutes);
app.use('/',ratingRoutes);

app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
});
