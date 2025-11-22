const Product = require('../../model/product.model')


//[GET] /admin/products
module.exports.products = async (req, res) => {

    const products = await Product.find({
        deleted: false
    })

    res.render('admin/pages/products/index', {
        titlePage: 'Quản lý sản phẩm',
        products: products
    })
}