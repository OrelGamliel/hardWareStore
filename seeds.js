var mongoose = require("mongoose");
var Tool = require("./models/tool");
var Comment   = require("./models/comment");
var Category  = require("./models/category") 

var toolData = [
    {
        name: "A single hammer",
        price: 5.00,
        image: "http://diyinahour.com/diy/wp-content/uploads/2013/03/Hammer.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        category: "Hammers"   
    },
    {
        name: "A nail", 
        price: 5.00,
        image: "https://techcrunch.com/wp-content/uploads/2011/07/551603_dc476aafa5f187dad4ca0773193c24e1.jpeg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        category: "Nails And Bolts"  
    },
    {
        name: "Hammer Drill", 
        price: 5.00,
        image: "http://p.globalsources.com/IMAGES/PDT/BIG/103/B1123961103.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        category: "Power Tools"  
    },
    {
        name: "Cement Bag",
        price: 5.00,
        image: "http://i.bosscdn.com/product/3b/1e/f9/ca20ecd9aee7c2d8ae491b9b51.jpg@4e_360w_360h.src",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        category: "Building Supplies, etc"   
    },
    {
        name: "Bulldozer",
        price: 5.00,
        image: "http://www.powerplus.us/resources/ck/images/machines/earthmoving/D6R.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        category: "Heavy Equipment"   
    },
    {
        name: "A Screwdriver",
        price: 5.00,
        image: "http://newimg.globalmarket.com/PicLib/225/603225/prod/54_1314341087871_l.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        category: "Screwdrivers"   
    }
];
var categData = [
    {
        name: "Nails And Bolts", 
        image: "http://www.amigosglobal.com/images/iStock_000012834962XSmall.jpg"
    },
    {
        name: "Hammers", 
        image: "https://images.unsplash.com/photo-1490557162706-284736f48784?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=18acabb5285db489af3d0216814b1657&auto=format&fit=crop&w=1350&q=80"
    },
    {
        name: "Power Tools", 
        image: "https://hips.hearstapps.com/pop.h-cdn.co/assets/15/52/1450742650-bosch-power-tools-image.jpg"
    },
    {
        name: "Building Supplies, etc", 
        image: "http://2.bp.blogspot.com/-8kvHTu3K8PA/TvG_mblRn3I/AAAAAAAAAGA/dXCVkBzLqkU/s640/cement-steel-brick.jpg"
    },
    {
        name: "Heavy Equipment", 
        image: "https://images.unsplash.com/uploads/1412631453782d87b4479/dbb91903?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5975a6658df95250c14effac1852e09b&auto=format&fit=crop&w=1353&q=80"
    },
    {
        name: "Screwdrivers", 
        image: "http://s3.amazonaws.com/bvsystem_tmp/pages/1286/original/screwdriver.jpg?1313612679"
    }
];

function seedDB(){
  Tool.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed Tools!");
        Category.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed categorys!");
            toolData.forEach(function(seed){
                Tool.create(seed, function(err, tool){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("added a tool");                              
                    }            
                });
            });
            categData.forEach(function(seed){
                Category.create(seed, function(err, category){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a category")
                    }
                })
            })
        });
    }); 

}


module.exports = seedDB;