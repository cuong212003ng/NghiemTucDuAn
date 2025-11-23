const Product = require('../../model/product.model')


//[GET] /admin/products
module.exports.products = async (req, res) => {
    //console.log(req.query.status)

    let find ={
        deleted: false
    }

    if(req.query.status){
        find.status = req.query.status
    }
    
    const products = await Product.find(find)



    
    res.render('admin/pages/products/index', {
        titlePage: 'Quản lý sản phẩm',
        products: products
    })
}