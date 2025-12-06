const Product = require('../../model/product.model')
//[GET] /products
module.exports.products = async (req, res) => {


    const products = await Product.find({
        status: 'active',
        deleted: false,
    })

    products.forEach(item => {
        item.oldPrice = item.price * (1 + item.discountPercentage / 100)
    })

    res.render('client/pages/products/index',{
        titlePage: 'Danh sách sản phẩm',
        products: products
    })
}

module.exports.productDetail = async (req, res) => {
    
    let find = {
        slug: req.params.slug,
        deleted: false,
        status: 'active'
    }

    const product = await Product.findOne(find)
    
    if(!product){
        req.flash('error', 'Sản phẩm không tồn tại')
        return res.redirect('/products')
    }
    
    res.render('client/pages/products/detail',{
        titlePage: 'Chi tiết sản phẩm',
        product: product
    })
}