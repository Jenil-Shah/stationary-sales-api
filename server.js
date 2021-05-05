// Name: Jenil Shah 

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dataService = require("./modules/data-service.js");

let pass = `Enter password`;
const myData = dataService(`enter the connection string`);

const app = express();

app.use(cors());

app.use(bodyParser.json());

const HTTP_PORT = process.env.PORT || 8080;

// ************* API Routes

// POST /api/sales (This route read the contents of the request body)
app.post("/api/sales", (req,res) =>{
    myData.addNewSale(req.body)
    .then(data =>{
        res.json(data);
    })
    .catch((err) =>{
        console.log(err);
        res.send(`Failed to add new Sale: ${err}`);
    });
});


// GET /api/sales (This route accept the numeric query parameters "page" and "perPage", ie: /api/sales?page=1&perPage=5 )
app.get("/api/sales", (req,res) =>{

    if(req.query.page && req.query.perPage)
    {
        myData.getAllSales(req.query.page, req.query.perPage)
        .then(data =>{
            res.json(data);
        })
        .catch(err =>{
            console.log(err);
        });
    }

    else
    {
        res.send("Enter the query parameters correctly");
    }
});


// GET /api/sales (This route accept a numeric route parameter, ie: /api/sales/5bd761dcae323e45a93ccfe8)
app.get("/api/sales/:index", (req,res) =>{
    myData.getSaleById(req.params.index)
    .then(data =>{
        res.json(data);
    })
    .catch(err =>{
        console.log(err);
        res.send("No data found!!");
    });
});


// PUT /api/sales (This route accept a numeric route parameter, ie: /api/sales/5bd761dcae323e45a93ccfe8 as well as read the contents of the request body)
app.put("/api/sales/:index", (req,res) =>{
    myData.updateSaleById(req.body,req.params.index)
    .then(data =>{
        res.json(data);
    })
    .catch(err =>{
        console.log(err);
        res.send(`Failed to update Sale: ${err}`);
    });
});


// DELETE /api/sales (This route accept a numeric route parameter, ie: /api/sales/5bd761dcae323e45a93ccfe8)
app.delete("/api/sales/:index", (req,res) =>{
    myData.deleteSaleById(req.params.index)
    .then(data =>{
        res.json(data);
    })
    .catch(err =>{
        console.log(err);
        res.send(`Failed to delete Sale: ${err}`);
    });
});

// ************* Initialize the Service & Start the Server

myData.initialize().then(()=>{
    app.listen(HTTP_PORT,()=>{
        console.log(`server listening on: ${HTTP_PORT}`);
    });
}).catch((err)=>{
    console.log(err);
});