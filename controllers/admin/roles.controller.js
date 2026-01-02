const Roles = require('../../model/roles.model')

const systemConfig = require('../../config/system')
//[GET] /admin/roles
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    }

    const records = await Roles.find(find)

    res.render('admin/pages/roles/index', {
        titlePage: 'Trang Quyền hạn',
        records: records
    })
}

//[GET] /admin/roles/create
module.exports.create = async (req, res) => {
    res.render('admin/pages/roles/create', {
        titlePage: 'Thêm quyền hạn'
    })
}

//[POST] /admin/roles/create
module.exports.createPost = async (req, res) => {
    try {
        const record = new Roles(req.body)
        await record.save()
        
        req.flash('success', 'Thêm quyền hạn thành công')
        res.redirect(`${systemConfig.prefixAdmin}/roles`)
    } catch (error) {
        req.flash('error', 'Thêm quyền hạn thất bại')
        res.redirect(`${systemConfig.prefixAdmin}/roles/create`)
    }
}