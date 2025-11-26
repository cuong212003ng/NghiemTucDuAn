const Product = require('../../model/product.model')

const filterStatusHelper = require('../../helpers/filterStatus')
const searchHelper = require('../../helpers/search')

//[GET] /admin/products
module.exports.products = async (req, res) => {

    let find = {
        deleted: false
    }
    
    if(req.query.status){
        find.status = req.query.status
    }
    
    //Filter status
    const filterStatus = filterStatusHelper.filterStatus(req.query)
    //End Filter status

    //Search
    const objectSearch = searchHelper.search(req.query)

    if(objectSearch.regex){
        find.title = objectSearch.regex
    }      
    //End Search
    
    //Pagination
    let objectPagination = {
        currentPage: 1,
        limitItems: 5
    }

    if(req.query.page){
        objectPagination.currentPage = parseInt(req.query.page)       
    }

    // Trang hien tai - 1 * so luong san pham tren trang = so luong san pham can bo qua
    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems
    
    const countProducts = await Product.countDocuments(find)
    const totalPage = Math.ceil(countProducts / objectPagination.limitItems)
    objectPagination.totalPage = totalPage

    //End Pagination



 

    const products = await Product.find(find).limit(objectPagination.limitItems).
    skip(objectPagination.skip)

    res.render('admin/pages/products/index', {
        titlePage: 'Quản lý',
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    })
}