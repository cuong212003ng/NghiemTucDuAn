//Change status
const buttonsChangeStatus = document.querySelectorAll('[button-change-status]')
if(buttonsChangeStatus.length > 0 ) {
    const formChangeStatus = document.querySelector('#form-change-status')
    const path = formChangeStatus.getAttribute('data-path')

    buttonsChangeStatus.forEach(button => {
        button.addEventListener('click', () => {
            const statusCurrent = button.getAttribute('data-status')
            const id = button.getAttribute('data-id')

            let statusChange = statusCurrent == 'active' ? 'inactive' : 'active'

            const action = path + `/${statusChange}/${id}?_method=PATCH`

            formChangeStatus.setAttribute('action', action)
            
            formChangeStatus.submit()
                                 
        })
    })

}
//End change status

//Delete product
const buttonsDelete = document.querySelectorAll('[button-delete]')
if(buttonsDelete.length) {
    const formDelete = document.querySelector('#form-delete')
    const path = formDelete.getAttribute('data-path')
    
    buttonsDelete.forEach(button => {
        button.addEventListener('click', () => {
            
            const isConfirm = confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')

            if(isConfirm) {
                const id = button.getAttribute('data-id')
                const action = path + `/${id}?_method=DELETE`

                formDelete.setAttribute('action', action)           
                formDelete.submit()


            }
        })
    })
}
//End delete product