const express = require('express') ;
const app = express()
const path = require('path')
const fs = require('fs')
var https = require('https');
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const generator = require("generate-password");
const multer = require('multer')
//const { findConfigFile } = require('typescript');
//const { parse } = require('csv-parse');
const { google } = require("googleapis");
//const OAuth2 = google.auth.OAuth2;
require("dotenv").config();
const Razorpay = require('razorpay');
//var https = require('https');
var http = require('http');
//const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const cors = require('cors');
var unzipper = require('unzipper');
//const { retail } = require('googleapis/build/src/apis/retail');
const mysql = require('mysql2');
const { userInfo } = require('os');
const bcrypt = require('bcryptjs');
const stripe = require('stripe')('sk_test_qm8WiKlVWv0HDOKNsSQOMzhs');

// Accepting CORS for development purpose
app.use(cors({
  origin: 'http://localhost:4300'
}))

// Multer for file attachments
var upload = multer({ dest: 'upload/'});
app.use(upload.any());
// Port
const port = 3000;

// MySQL Database Connection
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Mysql@2012', //'q2m@123'
    database : 'myfinance'
});

// Https server with SSL certificate credentials
/*
var https = require('https');
var credentials = {
        key: fs.readFileSync('myadlocal.key', 'utf-8'),
        cert: fs.readFileSync('myadlocal_CA_1.pem', 'utf-8'),
        ca: [fs.readFileSync('myadlocal_CA_2.pem', 'utf-8'),
             fs.readFileSync('myadlocal_CA_3.pem', 'utf-8')]};
var httpsServer = https.createServer(credentials, app);
*/

let server = http.Server(app);

// Razor Payment instance
const instance = new Razorpay({
  key_id: "rzp_test_FmQuWkK4OQ2ekn",
  key_secret: "TzwhmJvmSCu8KvC2AKC0fnfw",
});

// Encrypt function
const encrypt = (val) => {
  const encrypted = crypto.publicEncrypt(
    {
      key: RSA_PUBLIC_KEY,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "SHA256"
    },
    Buffer.from(val),
  );
  return encrypted.toString('base64');
};
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post('/api/payments', async (req, res) => {
  console.log('Request body:', req.body);
  console.log('Request headers:', req.headers);
  console.log(req.body);  // Log the entire request body to check its structure
  const { paymentMethodId } = req.body;  // Destructure paymentMethodId directly from req.body
  // Check if paymentMethodId is present
  if (!paymentMethodId) {
    return res.status(400).send('Missing paymentMethodId');
  }
  try {
      const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000, 
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: true,
      automatic_payment_methods: { enabled: true, allow_redirects: 'never' }
    });
    // Send success response with paymentIntent data
    res.send({ success: true, paymentIntent });
  } catch (error) {
    console.log("Error in payment");
    // Catch and handle any errors from Stripe API
    res.status(500).send({ error: error.message });
  }
});


// E-mail 
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var transport = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  auth: { user: process.env.EMAIL, pass: process.env.PASSWORD},
  secureConnection: true,
  tls: { ciphers: 'SSLv3' }
});

// Serving "data" and "media" directories
app.use('/data', express.static(process.cwd() + '/data'))
app.use('/media', express.static(process.cwd() + '/media'))
app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Serve "public" (customer application) and "admin" (Admin application)
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'admin')))
app.use(express.static(path.join(__dirname, 'media')))
app.use('/media/userguide', express.static(path.join(__dirname, 'media/userguide')));
app.use('/media/screenImages', express.static(path.join(__dirname, 'media/screenImages')));
app.use('/media/template', express.static(path.join(__dirname, 'media/template')));
// Serve "public" (customer application) by default

app.get(['/adminlogin', '/admin/*'], (req, res) => {
  res.sendFile(__dirname + '/admin/index.html');
})

app.get(['/', '/auth/*'], (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
})

app.get('/api/companyInfo', async (req, res1) => {
    var regNo = req.query.regNo;

    var options = {
        hostname: 'api.companieshouse.gov.uk',
        port: 443,
        path: '/company/' + regNo,
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + new Buffer('d537b3df-666c-4f9b-be95-226cf8caafa7' + ':' + '').toString('base64')
        }
    };

    var data = "";
    var req = https.request(options, (res) => {
        res.on('data', (d) => {
          data += d;
        });
        res.on('end', () => {
          var obj = JSON.parse(data);
          var address = obj.registered_office_address.address_line_1 + ', '+ obj.registered_office_address.address_line_2 + ', '+ obj.registered_office_address.country  + ', '+ obj.registered_office_address.locality ;
          res1.send(JSON.stringify({'status': true, 'companyName': obj.company_name,'address':address,'postcode':obj.registered_office_address.postal_code}));
        });
    });

    req.on('error', (e) => {
        console.error(e);
    });

    req.end();
})

app.get('/api/getLatLongFromPostCode', async (req, res1) => {
    var postCode = req.query.postCode;

    var options = {
        hostname: 'api.postcodes.io',
        port: 443,
        path: '/postcodes/' + postCode,
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    var data = "";
    var req = https.request(options, (res) => {
        res.on('data', (d) => {
          data += d;
        });
        res.on('end', () => {
          var obj = JSON.parse(data);
          if(obj.status == 200) {
            res1.send(JSON.stringify({'status': true, 'latitude': obj.result.latitude, 'longitude': obj.result.longitude}));
          }
          else {
                res1.send(JSON.stringify({'status': false}));
          }
        });
    });

    req.on('error', (e) => {
        console.error(e);
    });

    req.end();
})

// Get Screens
app.get('/api/screen', async (req, res) => {
    var result = [];
      connection.query('SELECT ID, SCREEN_NAME, NO_SCREEN_ID, LOCATION, RES_WIDTH, RES_HEIGHT, WIDTH, HEIGHT, NUM_LOOPS, NO_OF_SCREENS, LATITUDE, LONGITUDE, MEDIA_TYPE, ENVIRONMENT, SECTOR FROM SCREEN ORDER BY ID DESC', function (error, results, fields) {
        if (error) {
            console.log(error);
            res.send(JSON.stringify({status: false}));
            return;
        }
        for(i = 0; i < results.length; i++) {
          result.push({'id': results[i].ID, 'screenId': 'SCR_' + results[i].ID, 'screenName': results[i].SCREEN_NAME, 'NoScreenId': results[i].NO_SCREEN_ID, 'location': results[i].LOCATION, 'resWidth': results[i].RES_WIDTH, 'resHeight': results[i].RES_HEIGHT, 'width': results[i].WIDTH,'height': results[i].HEIGHT, 'loop': results[i].NUM_LOOPS, 'NoOFscreens': results[i].NO_OF_SCREENS, 'latitude': results[i].LATITUDE, 'longitude': results[i].LONGITUDE, 'mediaType': results[i].MEDIA_TYPE , 'environment':results[i].ENVIRONMENT,'sector':results[i].SECTOR});
            }
        
        res.send(JSON.stringify(result));
    });
  })
  
  
  // Add Screen
  app.post('/api/addscreen', upload.array('imagePaths'), async (req, res) => {
    var screenName = req.body.screenName;
    var NoScreenId = req.body.NoScreenId;
    var location = req.body.location;
    var resWidth =req.body.resWidth;
    var resHeight = req.body.resHeight;
    var width = req.body.width;
    var height = req.body.height;
    var loop = req.body.loop;
    var NoOFscreens = req.body.NoOFscreens;
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    var mediaType = req.body.mediaType;
    var environment = req.body.environment;
    var sector = req.body.sector;
    //  var imagePaths = "";
    let imagePaths = [];
    req.files.forEach((file, index) => {
  const customFileName = `screenImage_${index + 1}_${Date.now()}.jpg`;
  const sourcePath = path.join(__dirname, file.path);
  const destinationPath = path.join(__dirname, 'media/screenImages', customFileName); 
  fs.copyFile(sourcePath, destinationPath, (err) => {
    if (err) throw err;
    console.log('File was copied successfully');
   });
  //imagePaths = imagePaths + ", " + customFileName;
    imagePaths.push(customFileName);
  });

   //imagePaths = imagePaths.toString(2);

    const imagePathsString = imagePaths.join(",");
    var values = "'" + screenName + "','" + NoScreenId + "','" + location + "','"  + resWidth + "','" + resHeight + "','"  + width + "','" + height + "','" + loop + "','" + NoOFscreens + "','" + latitude + "','" + longitude + "','" + mediaType + "','" + environment + "','" + sector + "','" + imagePathsString + "'";
    connection.query("INSERT INTO SCREEN(SCREEN_NAME, NO_SCREEN_ID, LOCATION, RES_WIDTH, RES_HEIGHT, WIDTH, HEIGHT, NUM_LOOPS, NO_OF_SCREENS, LATITUDE, LONGITUDE, MEDIA_TYPE, ENVIRONMENT, SECTOR, IMAGEPATHS) VALUES(" + values + ")", function (error, results, fields) {
        if (error) {
          console.log(error);
            res.send(JSON.stringify({status: false}));
            return;
        }
        res.send(JSON.stringify({status: true}));
    });
  })

  
  // Update Screen
  app.post('/api/updatescreen', upload.single('file'), async (req, res) => {
    var id = parseInt(req.body.id);
    var screenName = req.body.screenName;
    var NoScreenId = req.body.NoScreenId;
    var location = req.body.location;
    var resWidth =req.body.resWidth;
    var resHeight = req.body.resHeight;
    var width = req.body.width;
    var height = req.body.height;
    var loop = req.body.loop;
    var NoOFscreens = req.body.NoOFscreens;
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    var mediaType = req.body.mediaType;
    var environment = req.body.environment;
    var sector = req.body.sector;
  
    
    var query = "UPDATE SCREEN SET screen_NAME='" + screenName + "', NO_SCREEN_ID ='" + NoScreenId + "', LOCATION='" + location + "', RES_WIDTH ='" + resWidth + "', RES_HEIGHT ='" + resHeight + "', WIDTH ='" + width + "', HEIGHT ='" + height + "', `NUM_LOOPS` ='" + loop + "', NO_OF_SCREENS='" + NoOFscreens + "', LATITUDE ='" + latitude + "', LONGITUDE ='" + longitude + "', MEDIA_TYPE ='" + mediaType + "', ENVIRONMENT ='" + environment + "', SECTOR ='" + sector + "' WHERE ID=" + id;
    connection.query(query, function (error, results, fields) {
        if (error) {
          console.log(error);
          res.send(JSON.stringify({status: false}));
          return;
      }
      res.send(JSON.stringify({status: true}));
  });
  })
        
  
  
  // Delete Screen
  app.get('/api/deletescreen', async (req, res) => {
      var id = parseInt(req.query.id);
      connection.query("DELETE FROM SCREEN WHERE ID=" + id, function (error, results, fields) {
          if (error) {
              console.log(error);
              res.send(JSON.stringify({status: false}));
              return;
          }
          res.send(JSON.stringify({status: true}));
      });
  })
  
  

// Get Admin Dashboard
app.get('/api/getAdminDashboardData', async (req, res) => {
  var numAdvertisers = 0;
  var numAgencies = 0;
  var numNetworkOwners = 0;
  var numScreens = 0;

  connection.query('SELECT COUNT(ID) AS COUNT FROM ADVERTISER', function (error, results, fields) {
      if(error) {
          console.log(error);
          res.send(JSON.stringify({status: false}));
          return;
      }
      numAdvertisers = results[0].COUNT;

      connection.query('SELECT COUNT(ID) AS COUNT FROM AGENCY', function (error, results, fields) {
          if(error) {
              console.log(error);
              res.send(JSON.stringify({status: false}));
              return;
          }
          numAgencies = results[0].COUNT;
          connection.query('SELECT COUNT(ID) AS COUNT FROM NETWORKOWNER', function (error, results, fields) {
              if(error) {
                  console.log(error);
                  res.send(JSON.stringify({status: false}));
                  return;
              }
              numNetworkOwners = results[0].COUNT;
              res.send(JSON.stringify({numAdvertisers: numAdvertisers, numAgencies: numAgencies, numNetworkOwners: numNetworkOwners, numScreens: numScreens}));
          });
      });
  });

  connection.query('SELECT COUNT(ID) AS COUNT FROM SCREEN', function (error, results, fields) {
    if(error) {
        console.log(error);
        res.send(JSON.stringify({status: false}));
        return;
    }
    numScreens = results[0].COUNT;
  });
})

// Advertiser/Agency/Network Owner Login Authentication
app.get('/api/login', async (req, res) => {
  connection.query("SELECT ID, PASSWORD, FIRSTNAME, LASTNAME FROM ADVERTISER WHERE EMAIL='" + req.query.username + "'", function (error, results, fields) {
    if(error) {
        console.log(error);
        res.send(JSON.stringify({status: false}));
        return;
    }

    var result = null;
    if(results.length > 0) {
        result = bcrypt.compareSync(req.query.password, results[0].PASSWORD);
    }

    if (result) {
        res.send(JSON.stringify({'status': true, 'authToken': '', 'role': 'advertiser', 'role2': '', 'id': results[0].ID, 'firstName': results[0].FIRSTNAME, 'lastName': results[0].LASTNAME}));
    } 
    else {
        connection.query("SELECT ID, PASSWORD, FIRSTNAME, LASTNAME FROM AGENCY WHERE EMAIL='" + req.query.username + "'", function (error, results, fields) {
            if(error) {
                console.log(error);
                res.send(JSON.stringify({status: false}));
                return;
            }

            if(results.length > 0) {
                var result = bcrypt.compareSync(req.query.password, results[0].PASSWORD);
                if (result) {
                    res.send(JSON.stringify({'status': true, 'authToken': '', 'role': 'agency', 'role2': '', 'id': results[0].ID, 'firstName': results[0].FIRSTNAME, 'lastName': results[0].LASTNAME}));
                } 
                else {
                    res.send(JSON.stringify({'status': false}));
                }
            }
            else {
                connection.query("SELECT ID, PASSWORD, FIRSTNAME, LASTNAME FROM NETWORKOWNER WHERE EMAIL='" + req.query.username + "'", function (error, results, fields) {
                  if(error) {
                      console.log(error);
                      res.send(JSON.stringify({status: false}));
                      return;
                  }
      
                  if(results.length > 0) {
                      var result = bcrypt.compareSync(req.query.password, results[0].PASSWORD);
                      if (result) {
                          res.send(JSON.stringify({'status': true, 'authToken': '', 'role': 'networkowner', 'role2': '', 'id': results[0].ID, 'firstName': results[0].FIRSTNAME, 'lastName': results[0].LASTNAME}));
                      } 
                      else {
                          res.send(JSON.stringify({'status': false}));
                      }
                  }
                  else {
                      res.send(JSON.stringify({'status': false}));
                  }
              });
            }
        });
    }
  });
})

// Admin Login Authentication
app.get('/api/adminlogin', async (req, res) => {
  connection.query("SELECT ID, PASSWORD, FIRSTNAME, LASTNAME FROM login WHERE EMAIL='" + req.query.username + "'", function (error, results, fields) {
      if(error) {
          console.log(error);
          res.send(JSON.stringify({status: false}));
          return;
      }

      var result = null;
      if(results.length > 0) {
          result = bcrypt.compareSync(req.query.password, results[0].PASSWORD);
      }

      if (result) {
          res.send(JSON.stringify({'status': true, 'authToken': '', 'role': results[0].ROLE, 'role2': results[0].ROLE2, 'id': results[0].ID, 'firstName': results[0].FIRSTNAME, 'lastName': results[0].LASTNAME}));
      } 
      else {
          connection.query("SELECT ID, PASSWORD, FIRSTNAME, LASTNAME FROM STAFF WHERE EMAIL='" + req.query.username + "'", function (error, results, fields) {
              if(error) {
                  console.log(error);
                  res.send(JSON.stringify({status: false}));
                  return;
              }

              if(results.length > 0) {
                  var result = bcrypt.compareSync(req.query.password, results[0].PASSWORD);
                  if (result) {
                      res.send(JSON.stringify({'status': true, 'authToken': '', 'role': 'staff', 'role2': '', 'id': results[0].ID, 'firstName': results[0].FIRSTNAME, 'lastName': results[0].LASTNAME}));
                  } 
                  else {
                      res.send(JSON.stringify({'status': false}));
                  }
              }
              else {
                  res.send(JSON.stringify({'status': false}));
              }
          });
      }
  });
})

// Get Advertisers
app.get('/api/advertiser', async (req, res) => {
    var result = [];
    connection.query('SELECT ID, FIRSTNAME, LASTNAME, COMPANY_TYPE, COMPANY_NAME, REG_NO, VAT_NO, EMAIL, LANDLINE, MOBILE, ADDRESS, POSTCODE FROM ADVERTISER ORDER BY ID DESC', function (error, results, fields) {
        if (error) {
            console.log(error);
            res.send(JSON.stringify({status: false}));
            return;
        }
        for(i = 0; i < results.length; i++) {
            result.push({'id': results[i].ID, 'firstName': results[i].FIRSTNAME, 'lastName': results[i].LASTNAME, 'companyType': results[i].COMPANY_TYPE, 'companyName': results[i].COMPANY_NAME, 'regNumber': results[i].REG_NO, 'vatNumber': results[i].VAT_NO, 'email': results[i].EMAIL, 'landline': results[i].LANDLINE, 'mobile': results[i].MOBILE, 'address': results[i].ADDRESS, 'postcode': results[i].POSTCODE});
        }
        res.send(JSON.stringify(result));
    });
})

// Add Advertiser
app.post('/api/addadvertiser', upload.single('file'), async (req, res) => {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var companyType =req.body.companyType;
  var companyName = req.body.companyName;
  var regNumber = req.body.regNumber;
  var vatNumber = req.body.vatNumber;
  var email = req.body.email;
  var landline = req.body.landline;
  var mobile = req.body.mobile;
  var address = req.body.address;
  var postcode = req.body.postcode;

  var values = "'" + firstName + "','" + lastName + "','"  + companyType + "','" + companyName + "','"  + regNumber + "','" + vatNumber + "','"  + email + "','" + landline + "','" + mobile + "','" + address + "','" + postcode + "', 1";
  connection.query("INSERT INTO ADVERTISER(FIRSTNAME, LASTNAME, COMPANY_TYPE, COMPANY_NAME, REG_NO, VAT_NO, EMAIL, LANDLINE, MOBILE, ADDRESS,POSTCODE, INDUSTRY_TYPE) VALUES(" + values + ")", function (error, results, fields) {
      if (error) {
          console.log(error);
          res.send(JSON.stringify({status: false}));
          return;
      }
      res.send(JSON.stringify({status: true}));
  });
})

// Update Advertiser
app.post('/api/updateadvertiser', upload.single('file'), async (req, res) => {
  var id = parseInt(req.body.id);
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var companyType =req.body.companyType;
  var companyName = req.body.companyName;
  var regNumber = req.body.regNumber;
  var vatNumber = req.body.vatNumber;
  var email = req.body.email;
  var landline = req.body.landline;
  var mobile = req.body.mobile;
  var address = req.body.address;
  var postcode = req.body.postcode;
  
  var query = "UPDATE ADVERTISER SET FIRSTNAME='" + firstName + "', LASTNAME='" + lastName + "', COMPANY_TYPE='" + companyType + "', COMPANY_NAME='" + companyName + "', REG_NO='" + regNumber + "', VAT_NO='" + vatNumber + "', EMAIL='" + email + 
                   "', LANDLINE='" + landline  + "', MOBILE='" + mobile + "', ADDRESS='" + address + "', POSTCODE='" + postcode + "' WHERE ID=" + id;
  connection.query(query, function (error, results, fields) {
      if (error) {
          console.log(error);
          res.send(JSON.stringify({status: false}));
          return;
      }
      res.send(JSON.stringify({status: true}));
  });
})

// Delete Advertiser
app.get('/api/deleteadvertiser', async (req, res) => {
    var id = parseInt(req.query.id);
    connection.query("DELETE FROM ADVERTISER WHERE ID=" + id, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.send(JSON.stringify({status: false}));
            return;
        }
        res.send(JSON.stringify({status: true}));
    });
})

// Get Staffs
app.get('/api/staff', async (req, res) => {
    var result = [];
    connection.query('SELECT ID, FIRSTNAME, LASTNAME, EMAIL, PHONE, ADDRESS FROM STAFF ORDER BY ID DESC', function (error, results, fields) {
        if (error) {
            console.log(error);
            res.send(JSON.stringify({status: false}));
            return;
        }
        for(i = 0; i < results.length; i++) {
            result.push({'id': results[i].ID, 'firstName': results[i].FIRSTNAME, 'lastName': results[i].LASTNAME, 'email': results[i].EMAIL, 'phone': results[i].PHONE, 'address': results[i].ADDRESS});
        }
        res.send(JSON.stringify(result));
    });
})

// Add Staff
app.post('/api/addstaff', upload.single('file'), async (req, res) => {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var phone = req.body.phone;
    var address = req.body.address;

    var values = "'" + firstName + "','" + lastName + "','" + email + "','" + phone + "','" + address + "'";
    connection.query("INSERT INTO STAFF(FIRSTNAME, LASTNAME, EMAIL, PHONE, ADDRESS) VALUES(" + values + ")", function (error, results, fields) {
        if (error) {
            console.log(error);
            res.send(JSON.stringify({status: false}));
            return;
        }
        res.send(JSON.stringify({status: true}));
    });
})

// Update Staff
app.post('/api/updatestaff', upload.single('file'), async (req, res) => {
    var id = parseInt(req.body.id);
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var phone = req.body.phone;
    var address = req.body.address;

    var query = "UPDATE STAFF SET FIRSTNAME='" + firstName + "', LASTNAME='" + lastName + "', EMAIL='" + email + 
                    "', PHONE='" + phone  + "', ADDRESS='" + address + "' WHERE ID=" + id;
    connection.query(query, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.send(JSON.stringify({status: false}));
            return;
        }
        res.send(JSON.stringify({status: true}));
    });
})

//Delete Staff
app.get('/api/deletestaff', async (req, res) => {
    var id = parseInt(req.query.id);
    connection.query("DELETE FROM STAFF WHERE ID=" + id, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.send(JSON.stringify({status: false}));
            return;
        }
        res.send(JSON.stringify({status: true}));
    });
})

// Get Agencies
app.get('/api/agency', async (req, res) => {
  var result = [];
  connection.query('SELECT ID, FIRSTNAME, LASTNAME, COMPANY_TYPE, COMPANY_NAME, REG_NO, VAT_NO, EMAIL, LANDLINE, MOBILE, ADDRESS, POSTCODE FROM AGENCY', function (error, results, fields) {

      if (error) {
          console.log(error);
          res.send(JSON.stringify({status: false}));
          return;
      }
      for(i = 0; i < results.length; i++) {
         // result.push({'id': results[i].ID, 'firstName': results[i].FIRSTNAME, 'lastName': results[i].LASTNAME, 'email': results[i].EMAIL, 'phone': results[i].PHONE, 'company': results[i].COMPANY, 'address': results[i].ADDRESS});
         result.push({'id': results[i].ID, 'firstName': results[i].FIRSTNAME, 'lastName': results[i].LASTNAME, 'companyType': results[i].COMPANY_TYPE, 'companyName': results[i].COMPANY_NAME, 'regNumber': results[i].REG_NO, 'vatNumber': results[i].VAT_NO, 'email': results[i].EMAIL, 'landline': results[i].LANDLINE, 'mobile': results[i].MOBILE, 'address': results[i].ADDRESS, 'postcode': results[i].POSTCODE});

        }
      res.send(JSON.stringify(result));
  });
})

// Add Agency
app.post('/api/addagency', upload.single('file'), async (req, res) => {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var companyType =req.body.companyType;
  var companyName = req.body.companyName;
  var regNumber = req.body.regNumber;
  var vatNumber = req.body.vatNumber;
  var email = req.body.email;
  var landline = req.body.landline;
  var mobile = req.body.mobile;
  var address = req.body.address;
  var postcode = req.body.postcode;

  var values = "'" + firstName + "','" + lastName + "','"  + companyType + "','" + companyName + "','"  + regNumber + "','" + vatNumber + "','" + email + "','" + landline + "','" + mobile + "','" + address + "','" + postcode + "', 1";
  connection.query("INSERT INTO AGENCY(FIRSTNAME, LASTNAME, COMPANY_TYPE, COMPANY_NAME, REG_NO, VAT_NO, EMAIL, LANDLINE, MOBILE, ADDRESS, POSTCODE, INDUSTRY_TYPE) VALUES(" + values + ")", function (error, results, fields) {
      if (error) {
          console.log(error);
          res.send(JSON.stringify({status: false}));
          return;
      }
      res.send(JSON.stringify({status: true}));
  });
})

// Update Agency
app.post('/api/updateagency', upload.single('file'), async (req, res) => {
  var id = parseInt(req.body.id);
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
 var companyType =req.body.companyType;
  var companyName = req.body.companyName;
  var regNumber = req.body.regNumber;
  var vatNumber = req.body.vatNumber;
  var email = req.body.email;
  var landline = req.body.landline;
  var mobile = req.body.mobile;
  var address = req.body.address;
  var postcode = req.body.postcode;
  
  var query = "UPDATE AGENCY SET FIRSTNAME='" + firstName + "', LASTNAME='" + lastName + "', COMPANY_TYPE='" + companyType + "', COMPANY_NAME='" + companyName + "', REG_NO='" + regNumber + "', VAT_NO='" + vatNumber + "', EMAIL='" + email + 
                   "', LANDLINE ='" + landline  + "', MOBILE='" + mobile + "', ADDRESS='" + address + "', POSTCODE='" + postcode + "' WHERE ID=" + id;
  connection.query(query, function (error, results, fields) {
      if (error) {
          console.log(error);
          res.send(JSON.stringify({status: false}));
          return;
      }
      res.send(JSON.stringify({status: true}));
  });
})

// Delete Agency
app.get('/api/deleteagency', async (req, res) => {
    var id = parseInt(req.query.id);
    connection.query("DELETE FROM AGENCY WHERE ID=" + id, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.send(JSON.stringify({status: false}));
            return;
        }
        res.send(JSON.stringify({status: true}));
    });
})

// Get Network Owners
app.get('/api/networkowner', async (req, res) => {
  var result = [];
  connection.query('SELECT ID, FIRSTNAME, LASTNAME, COMPANY_TYPE, COMPANY_NAME, REG_NO, VAT_NO, EMAIL, LANDLINE, MOBILE, ADDRESS, POSTCODE FROM NETWORKOWNER', function (error, results, fields) {

      if (error) throw error;
      for(i = 0; i < results.length; i++) {
          //result.push({'id': results[i].ID, 'firstName': results[i].FIRSTNAME, 'lastName': results[i].LASTNAME, 'email': results[i].EMAIL, 'phone': results[i].PHONE, 'company': results[i].COMPANY, 'address': results[i].ADDRESS});
          result.push({'id': results[i].ID, 'firstName': results[i].FIRSTNAME, 'lastName': results[i].LASTNAME, 'companyType': results[i].COMPANY_TYPE, 'companyName': results[i].COMPANY_NAME, 'regNumber': results[i].REG_NO, 'vatNumber': results[i].VAT_NO, 'email': results[i].EMAIL, 'landline': results[i].LANDLINE, 'mobile': results[i].MOBILE, 'address': results[i].ADDRESS, 'postcode': results[i].POSTCODE});

        }
      res.send(JSON.stringify(result));
  });
})

// Add Network Owner
app.post('/api/addnetworkowner', upload.single('file'), async (req, res) => {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var companyType =req.body.companyType;
  var companyName = req.body.companyName;
  var regNumber = req.body.regNumber;
  var vatNumber = req.body.vatNumber;
  var email = req.body.email;
  var landline = req.body.landline;
  var mobile = req.body.mobile;
  var address = req.body.address;
  var postcode = req.body.postcode;

  var values = "'" + firstName + "','" + lastName + "','"  + companyType + "','" + companyName + "','"  + regNumber + "','" + vatNumber + "','" + email + "','" + landline + "','" + mobile + "','" + address + "','" + postcode + "', 1";
  connection.query("INSERT INTO NETWORKOWNER(FIRSTNAME, LASTNAME, COMPANY_TYPE, COMPANY_NAME, REG_NO, VAT_NO, EMAIL, LANDLINE, MOBILE, ADDRESS, POSTCODE, NETWORKTYPE) VALUES(" + values + ")", function (error, results, fields) {
      if (error) {
          console.log(error);
          res.send(JSON.stringify({status: false}));
          return;
      }
      res.send(JSON.stringify({status: true}));
  });
})

// Update Network Owner
app.post('/api/updatenetworkowner', upload.single('file'), async (req, res) => {
  var id = parseInt(req.body.id);
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var companyType =req.body.companyType;
  var companyName = req.body.companyName;
  var regNumber = req.body.regNumber;
  var vatNumber = req.body.vatNumber;
  var email = req.body.email;
  var landline = req.body.landline;
  var mobile = req.body.mobile;
  var address = req.body.address;
  var postcode = req.body.postcode;
  
  var query = "UPDATE NETWORKOWNER SET FIRSTNAME='" + firstName + "', LASTNAME='" + lastName + "', COMPANY_TYPE='" + companyType + "', COMPANY_NAME='" + companyName + "', REG_NO='" + regNumber + "', VAT_NO='" + vatNumber + "', EMAIL='" + email + 
                   "', LANDLINE ='" + landline  + "', MOBILE ='" + mobile + "', ADDRESS='" + address + "', POSTCODE='" + postcode + "' WHERE ID=" + id;
  connection.query(query, function (error, results, fields) {
      if (error) {
          console.log(error);
          res.send(JSON.stringify({status: false}));
          return;
      }
      res.send(JSON.stringify({status: true}));
  });
})

// Delete Network Owner
app.get('/api/deletenetworkowner', async (req, res) => {
    var id = parseInt(req.query.id);
    connection.query("DELETE FROM NETWORKOWNER WHERE ID=" + id, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.send(JSON.stringify({status: false}));
            return;
        }
        res.send(JSON.stringify({status: true}));
    });
})

// Get Master
app.get('/api/master', async (req, res) => {
  var result = [];
  var Option = req.query.selectedOption;
  console.log('Received selected option:', Option);
connection.query('SELECT ID, NAME FROM '  + Option  , function (error, results, fields) {
      if (error) throw error;
      for(i = 0; i < results.length; i++) {
          result.push({'id': results[i].ID, 'Name': results[i].NAME});
      }
      res.send(JSON.stringify(result));
  });
})


app.post('/api/addmaster', upload.single('file'), async (req, res) => {
  var Option = req.query.selectedOption;
  var Name = req.body.Name;
  
  var values = "'" + Name + "'";
if (Option === 'industrytype') {
  connection.query("INSERT INTO " + Option +"(NAME) VALUES(" + values + ")", function (error, results, fields) {
    if (error) {
        console.log(error);
        res.send(JSON.stringify({status: false}));
        return;
    }
    res.send(JSON.stringify({status: true}));
});
   
  } else if (Option === 'networktype') {
    connection.query("INSERT INTO " + Option +"(NAME) VALUES(" + values + ")", function (error, results, fields) {
      if (error) {
          console.log(error);
          res.send(JSON.stringify({status: false}));
          retur
      }
      res.send(JSON.stringify({status: true}));
  });
 
  }
  else {
    res.status(400).send({ error: 'Invalid option' });
  }

})
//Update Master
app.post('/api/updatemaster', upload.single('file'), async (req, res) => {
  var Option = req.query.selectedOption;
 
  var id = parseInt(req.body.id);
   var Name = req.body.Name;

if (Option === 'industrytype') {
  var query = "UPDATE "   + Option +  " SET NAME='" + Name + "' WHERE ID=" + id;
    connection.query(query, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.send(JSON.stringify({status: false}));
            return;
        }
        res.send(JSON.stringify({status: true}));
    });
   
  } else if (Option === 'networktype') {
    var query = "UPDATE "   + Option +  " SET NAME='" + Name + "' WHERE ID=" + id;
    connection.query(query, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.send(JSON.stringify({status: false}));
            return;
        }
        res.send(JSON.stringify({status: true}));
    });
 
  }
  else {
    res.status(400).send({ error: 'Invalid option' });
  }

})



app.get('/api/deletemaster', async (req, res) => {
 var Option = req.query.selectedOption;
  var id = parseInt(req.query.id);
    // console.log('Deleted ID:', id);
    if (Option === 'industrytype') {
      
    connection.query("DELETE FROM " + Option + " WHERE ID  = " + id, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.send(JSON.stringify({status: false}));
            return;
        }
        res.send(JSON.stringify({status: true}));
    });
  } else if (Option === 'networktype') {
    connection.query("DELETE FROM " + Option + " WHERE ID = " + id, function (error, results, fields) {
      if (error) {
          console.log(error);
          res.send(JSON.stringify({status: false}));
          return;
      }
      res.send(JSON.stringify({status: true}));
  });
 
  }
  else {
    res.status(400).send({ error: 'Invalid option' });
  }
  })



//Upload Pdf File

  app.post('/api/uploadUserGuide', upload.single('file'), async (req, res) => {
   if (!req.file ) {
      return res.status(400).send('No file uploaded.');
    }
 
  const filename = req.file.filename;  
  const sourcePath = path.join(__dirname, './upload', filename);  // Source file path
  const destinationPath = path.join(__dirname, './media/userguide/userguide.pdf');      // Destination file path

  // Copy file from source to destination
 fs.copyFile(sourcePath, destinationPath, (err) => {
      if(err) {
       res.send(JSON.stringify({status: false}));
        return;
        }
    res.send(JSON.stringify({status: true}));
  
    });
});
 

//Upload Picture or Video

  app.post('/api/uploadTemplate', upload.single('file'), async (req, res) => {

        if (!req.file ) {
          return res.status(400).send('No file uploaded.');
        }
       const filename = req.file.filename;  

      // Determine custom filename prefix based on MIME type
      let prefix = '';
      if (req.file.mimetype.startsWith('image/')) {
        prefix = 'picture';
      } else if (req.file.mimetype.startsWith('video/')) {
        prefix = 'video';
      } else {
        // return res.status(400).send({ status: false, message: 'Invalid file type.' });
        res.send(JSON.stringify({status: false}));
      }
      const customFilename = `${prefix}_${Date.now()}_${req.file.originalname}`;
      const sourcePath = path.join(__dirname, './upload', filename);  
      const destinationPath = path.join(__dirname, './media/template/',customFilename);     
        fs.copyFile(sourcePath, destinationPath, (err) => {
          if(err) {
            res.send(JSON.stringify({status: false}));
            return;
            }
        res.send(JSON.stringify({status: true}));
      
        });
   
});

//Add Register
app.post('/api/addregister', upload.single('file'), async (req, res) => {

  var userType = req.body.userType;
  var companyType = req.body.companyType;
  var regNumber = req.body.regNumber;
  var companyName = req.body.companyName;
  var vatNumber = req.body.vatNumber;
  var address = req.body.address;
  var postcode = req.body.postcode;
  var mobile = req.body.mobile;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var landline = req.body.landline;

  var values = "'" + userType + "','" + companyType + "','" + regNumber + "','" + companyName + "','" + vatNumber + "','" + address + "','" + postcode + "','" + mobile + "','" + firstName + "','"  + lastName + "','" + email + "','" + landline + "'";
  connection.query("INSERT INTO REGISTER(USER_TYPE, COMPANY_TYPE, REGISTRATION_NUMBER, COMPANY_NAME, VAT_NUMBER, ADDRESS, POSTCODE, MOBILE_NO, FIRSTNAME, LASTNAME, EMAIL, LANDLINE_NO) VALUES(" + values + ")", function (error, results, fields) {
      if (error) {
          console.log(error);
          res.send(JSON.stringify({status: false}));
          return;
      }
      res.send(JSON.stringify({status: true}));
  });
})

//  Registration Page
app.get('/api/registration', async (req, res) => {
  var result = [];

  connection.query('SELECT ID, USER_TYPE, COMPANY_TYPE, REGISTRATION_NUMBER, COMPANY_NAME, VAT_NUMBER, ADDRESS, POSTCODE, MOBILE_NO, FIRSTNAME, LASTNAME, EMAIL, LANDLINE_NO, IS_APPROVED FROM REGISTER ', function (error, results, fields) {
    if (error) {
        console.log(error);
        res.send(JSON.stringify({status: false}));
        return;
    }
    for(i = 0; i < results.length; i++) {
        result.push({'id': results[i].ID, 'userType':results[i].USER_TYPE, 'companyType':results[i].COMPANY_TYPE, 'regNumber':results[i].REGISTRATION_NUMBER, 'companyName':results[i].COMPANY_NAME, 'vatNumber':results[i].VAT_NUMBER, 'address': results[i].ADDRESS, 'postcode': results[i].POSTCODE, 'mobile': results[i].MOBILE_NO, 'firstName': results[i].FIRSTNAME, 'lastName': results[i].LASTNAME, 'email': results[i].EMAIL, 'landline': results[i].LANDLINE_NO, 'is_Approved':results[i].IS_APPROVED});
    }
    res.send(JSON.stringify(result));
});
})


// Regiatration Approval
app.post('/api/approve-registration', upload.single('file'), async (req, res) => {
  var userType = req.body.userType;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var companyType = req.body.companyType;
  var companyName = req.body.companyName;
  var regNumber = req.body.regNumber;
  var vatNumber = req.body.vatNumber;
  var email = req.body.email;
  var landline = req.body.landline;
  var mobile = req.body.mobile;
  var address = req.body.address;
  var postcode = req.body.postcode;

  // Generate a random password
  const generatePassword = () => Math.random().toString(36).slice(-8);
  const plainPassword = generatePassword();
  console.log(plainPassword);
 // const hashedPassword = await bcrypt.hash(plainPassword, 10);
  const password = await bcrypt.hash(plainPassword, 10);
  console.log("PASSWORD:", password);
 // var password ="123";
 
  var values = "'" + firstName + "','" + lastName + "','" + companyType + "','" + companyName + "','" + regNumber + "','" + vatNumber + "','" + email + "','" + landline + "','" + mobile + "','" + address + "','" + postcode + "','" + password + "', 1";
  
  if (userType === 'Advertiser') {
  connection.query("INSERT INTO ADVERTISER(FIRSTNAME, LASTNAME, COMPANY_TYPE, COMPANY_NAME, REG_NO, VAT_NO, EMAIL, LANDLINE, MOBILE, ADDRESS, POSTCODE, PASSWORD, INDUSTRY_TYPE) VALUES(" + values + ")", function (error, results, fields) {
      if (error) {
          console.log(error);
          res.send(JSON.stringify({status: false}));
          return;
      }
      res.send(JSON.stringify({status: true}));
  });
}else if (userType === 'Agency') {
  connection.query("INSERT INTO AGENCY(FIRSTNAME, LASTNAME, COMPANY_TYPE, COMPANY_NAME, REG_NO, VAT_NO, EMAIL, LANDLINE, MOBILE, ADDRESS, POSTCODE, PASSWORD, INDUSTRY_TYPE) VALUES(" + values + ")", function (error, results, fields) {
    if (error) {
        console.log(error);
        res.send(JSON.stringify({status: false}));
        return;
    }
    res.send(JSON.stringify({status: true}));
});
}else if (userType === 'NetworkOwner') {
  connection.query("INSERT INTO NETWORKOWNER(FIRSTNAME, LASTNAME, COMPANY_TYPE, COMPANY_NAME, REG_NO, VAT_NO, EMAIL, LANDLINE, MOBILE, ADDRESS, POSTCODE, PASSWORD, NETWORKTYPE) VALUES(" + values + ")", function (error, results, fields) {
    if (error) {
        console.log(error);
        res.send(JSON.stringify({status: false}));
        return;
    }
    res.send(JSON.stringify({status: true}));
});
}
else {
      res.status(400).send({ error: 'Invalid option' });
    }

// Update REGISTER with approved status
 const query = 'UPDATE REGISTER SET is_approved = 1 WHERE email = ?';
 connection.query(query, [email], (error, results) => {
   if (error) {
    // console.log(error);
    res.send(JSON.stringify({status: false}));
    return;
   }
 });
})

app.get('/api/orders', async (req, res) => {
  const result = [];
  const query = `SELECT 
      ORDERID, ORDERNUMBER, ORDERDATE, CUSTOMERID, PRODUCTID, PRODUCTNAME, QUANTITY, UNITCOST, LINETOTAL, TAXAMOUNT, LINETOTALWITHTAX, TOTALAMOUNT, DISCOUNTAMOUNT, TAXAMOUNTORDER, PAYMENTMETHOD, PAYMENTSTATUS, STATUS, 
      CREATEDAT, UPDATEDAT   FROM    ORDERS`;

  connection.query(query, function (error, results, fields) {
    if (error) {
      console.log('Database query error:', error);
      res.status(500).send(JSON.stringify({ status: false, error: 'Database query failed' }));
      return;
    }

    for (let i = 0; i < results.length; i++) {
      result.push({
        orderId: results[i].ORDERID,
        orderNumber: results[i].ORDERNUMBER,
        orderDate: results[i].ORDERDATE,
        customerId: results[i].CUSTOMERID,
        productId: results[i].PRODUCTID,
        productName: results[i].PRODUCTNAME,
        quantity: results[i].QUANTITY,
        unitCost: results[i].UNITCOST,
        lineTotal: results[i].LINETOTAL,
        taxAmount: results[i].TAXAMOUNT,
        lineTotalWithTax: results[i].LINETOTALWITHTAX,
        totalAmount: results[i].TOTALAMOUNT,
        discountAmount: results[i].DISCOUNTAMOUNT,
        taxAmountOrder: results[i].TAXAMOUNTORDER,
        paymentMethod: results[i].PAYMENTMETHOD,
        paymentStatus: results[i].PAYMENTSTATUS,
        status: results[i].STATUS,
        createdAt: results[i].CREATEDAT,
        updatedAt: results[i].UPDATEDAT,
      });
    }

    res.status(200).send(JSON.stringify(result));
  });
});


//app.get('*', (req, res) => {
//  res.sendFile(__dirname + '/public/index.html');
//})

server.listen(port, async () => {
  console.log(`MyAdLocal WebServer listening on port ${port}`)
})