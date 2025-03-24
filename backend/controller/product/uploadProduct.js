// const uploadProductPermission = require("../../helpers/permission")
// const productModel = require("../../models/productModel")

// async function UploadProductController(req,res){
//     try{
//         const sessionUserId = req.userId

//         if(!uploadProductPermission(sessionUserId)){
//             throw new Error("Permission denied")
//         }
    
//         const uploadProduct = new productModel(req.body)
//         const saveProduct = await uploadProduct.save()

//         res.status(201).json({
//             message : "Product upload successfully",
//             error : false,
//             success : true,
//             data : saveProduct
//         })

//     }catch(err){
//         res.status(400).json({
//             message : err.message || err,
//             error : true,
//             success : false
//         })
//     }
// }

// module.exports = UploadProductController


const uploadProductPermission = require("../../helpers/permission");
const productModel = require("../../models/productModel");

async function UploadProductController(req, res) {
    try {
        const sessionUserId = req.userId;

        // Check if the user has permission to upload a product
        if (!uploadProductPermission(sessionUserId)) {
            return res.status(403).json({
                message: "Permission denied",
                error: true,
                success: false,
            });
        }

        // Validate required fields in the request body
        const { productName, brandName, category, productImage, description, price, sellingPrice } = req.body;

        if (!productName || !brandName || !category || !productImage || !description || !price || !sellingPrice) {
            return res.status(400).json({
                message: "All fields are required",
                error: true,
                success: false,
            });
        }

        // Create new product instance
        const uploadProduct = new productModel(req.body);

        // Save the product to the database
        const saveProduct = await uploadProduct.save();

        // Respond with a success message
        res.status(201).json({
            message: "Product uploaded successfully",
            error: false,
            success: true,
            data: saveProduct,
        });

    } catch (err) {
        // Error handling
        res.status(400).json({
            message: err.message || "Something went wrong",
            error: true,
            success: false,
        });
    }
}

module.exports = UploadProductController;
