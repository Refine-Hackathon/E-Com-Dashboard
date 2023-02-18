const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const directory = `./Images/${req.body.Album}`;
      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
      }
  
      cb(null, directory);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage });


const getAllProperties =  (req, res) => {
    const result = [
        {
          id : '1',
          title : 'ABC',
          location: 'BANGALORE',
          price : '1000',
          photo : '#',
        },
        {
          id : '2',
          title : 'abc',
          location: 'mumbai',
          price : '2000',
          photo : '#',
        },
      ]
      res.send(result);
};

const getAllProducts =(req, res) => {
    const product = req.params.p_name;
    const { _end, _order ,_start  , gender = "" } = req.query;

    let order = "ASC";
    if(_order !== undefined)order = _order;
    const query1 = 'SELECT cat_id from `categories` where `name` = "'+ product + '"';
      
    db.query(query1 , (err , result1) => {
          if(err)
          {return res.json("server error")}

          let query2 = "";
          if(gender !== "")//query based on gender specified
          {
            query2 = 'SELECT *  from `product` where `cat_id` = '+ result1[0].cat_id + ' and `gender` = "' + gender +'" order by `product_cost` ' + order;
          }else{
            query2 = 'SELECT *  from `product` where `cat_id` = '+ result1[0].cat_id +' order by `product_cost`' + order ;
          }

          db.query(query2 , (err , result2) => {
              if(err) {
                console.log(err)
                return res.status(500).send([])
              }  
              const count = result2.length;
              res.header("x-total-count" ,count );
              res.header("Access-Control-Expose-Headers" , "x-total-count");
              //console.log(result2);
              return res.status(200).json(result2);
          })
      })
};

const getProduct = (req,res) => {
    const query1 =
    'SELECT *  from `product` where `prdt_id` = ' + req.params.id + '';

    db.query(query1, (err, result) => {
    if (err) {
      return res.status(500).send([]);
    }
    console.log(result);
    return res.status(200).send(result);
  });
}


const postProduct = (req,res) => {
    const { category, type, title, price, description } = req.body;

    let base64Image = req.body.photo.split(';base64,').pop();
  
    fs.writeFile(
      'image.png',
      base64Image,
      { encoding: 'base64' },
      function (err) {
        console.log('File created');
      }
    );
  
    const queryString = `INSERT into product 
      (cat_id,product_type,product_name,product_details,product_cost,img_path)
      VALUES ('${1}', '${type}', '${title}', '${description}', '${price}','img')`;
    console.log(type);
    db.query(queryString, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send([]);
      }
      console.log(result);
      res.status(201).send('Created');
    });
}
