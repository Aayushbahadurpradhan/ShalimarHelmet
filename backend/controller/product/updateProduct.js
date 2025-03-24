// const uploadProductPermission = require('../../helpers/permission')
// const productModel = require('../../models/productModel')

// async function updateProductController(req,res){
//     try{

//         if(!uploadProductPermission(req.userId)){
//             throw new Error("Permission denied")
//         }

//         const { _id, ...resBody} = req.body

//         const updateProduct = await productModel.findByIdAndUpdate(_id,resBody)
        
//         res.json({
//             message : "Product update successfully",
//             data : updateProduct,
//             success : true,
//             error : false
//         })

//     }catch(err){
//         res.status(400).json({
//             message : err.message || err,
//             error : true,
//             success : false
//         })
//     }
// }


// module.exports = updateProductController

const uploadProductPermission = require('../../helpers/permission');
const productModel = require('../../models/productModel');

async function updateProductController(req, res) {
    try {
        // Check if the user has permission to update a product
        if (!uploadProductPermission(req.userId)) {
            return res.status(403).json({
                message: "Permission denied",
                error: true,
                success: false,
            });
        }

        const { _id, ...updateData } = req.body;

        // Validate that _id is provided
        if (!_id) {
            return res.status(400).json({
                message: "Product ID is required",
                error: true,
                success: false,
            });
        }

        // Check if the product exists
        const existingProduct = await productModel.findById(_id);
        if (!existingProduct) {
            return res.status(404).json({
                message: "Product not found",
                error: true,
                success: false,
            });
        }

        // Update the product
        const updatedProduct = await productModel.findByIdAndUpdate(_id, updateData, { new: true });

        // Respond with success
        res.json({
            message: "Product updated successfully",
            data: updatedProduct,
            success: true,
            error: false,
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

module.exports = updateProductController;
