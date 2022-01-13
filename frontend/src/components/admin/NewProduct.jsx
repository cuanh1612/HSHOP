import React, { useEffect, useState, useRef } from 'react'

import MetaData from '../layouts/MetaData'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { newProduct, clearError } from '../../actions/productActions'
import { NEW_PRODUCT_RESET } from '../../constants/productConstants'


const NewProduct = ({ history }) => {
    const name = useRef('')
    const price = useRef('')
    const description = useRef('')
    const category = useRef('')
    const stock = useRef('')
    const seller = useRef('')
    const [images, setImages] = useState([])
    const [imagesPreview, setImagesPreview] = useState([])

    const categories = [
        'Electronics',
        'Cameras',
        'Laptop',
        'Accessories',
        'Headphones',
        'Food',
        'books',
        'clother/shoes',
        'Beauty/Health',
        'Sports',
        'Outdoor',
        'Home'
    ]

    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, error, success } = useSelector(state => state.NewProduct)

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError())
        }

        if (success) {
            history.push('/admin/products')
            alert.success('Product created successfully')
            dispatch({
                type: NEW_PRODUCT_RESET
            })
        }
    }, [dispatch, alert, error, success, history])

    const submitHandler = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.set('name', name.current.value)
        formData.set('price', price.current.value)
        formData.set('description', description.current.value)
        formData.set('category', category.current.value)
        formData.set('stock', stock.current.value)
        formData.set('seller', seller.current.value)

        images.forEach(image => {
            formData.append('images', image)
        })
        dispatch(newProduct(formData))
    }

    const changeImagesProduct = (e) => {
        const files = Array.from(e.target.files)

        setImagesPreview([])
        setImages([])

        files.forEach(file => {
            const reader = new FileReader()

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, reader.result])
                }
            }

            reader.readAsDataURL(file)
        })
    }

    return (
        <>
            <MetaData title={"New Product"} />
            <div className='row'>
                <div className='col-12 col-md-2'>
                    <Sidebar />
                </div>

                <div className='col-12 col-md-10'>
                    <>
                        <div className="my-5 wrapper">
                            <form className="shadow-lg" encType="multipart/form-data" onSubmit={submitHandler}>
                                <h1 className="mb-4">New Product</h1>
                                <div className="form-group">
                                    <label htmlFor="name_field">Name</label>
                                    <input ref={name} type="text" id="name_field" className="form-control" defaultValue />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="price_field">Price</label>
                                    <input ref={price} type="text" id="price_field" className="form-control" defaultValue />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description_field">Description</label>
                                    <textarea ref={description} className="form-control" id="description_field" rows={8} defaultValue={""} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="category_field">Category</label>
                                    <select ref={category} className="form-control" id="category_field">
                                        {categories.map(category => (
                                            <option key = {category} calue = {category}>{category}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="stock_field">Stock</label>
                                    <input ref={stock} type="number" id="stock_field" className="form-control" defaultValue />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="seller_field">Seller Name</label>
                                    <input ref={seller} type="text" id="seller_field" className="form-control" defaultValue />
                                </div>
                                <div className="form-group">
                                    <label>Images</label>
                                    <div className="custom-file">
                                        <input onChange = {changeImagesProduct} type="file" name="product_images" className="custom-file-input" id="customFile" multiple />
                                        <label className="custom-file-label" htmlFor="customFile">
                                            Choose Images
                                        </label>
                                    </div>
                                    
                                    {imagesPreview.map(img => (
                                        <img src={img} key={img} alt ="Images Preview" className="mt-3 mr-2" width="55" height="52"/>
                                    ))}
                                </div>
                                <button disabled={loading ? true : false} id="login_button" type="submit" className="py-3 btn btn-block">
                                    CREATE
                                </button>
                            </form>
                        </div>
                    </>
                </div>
            </div>
        </>
    )
}

export default NewProduct
