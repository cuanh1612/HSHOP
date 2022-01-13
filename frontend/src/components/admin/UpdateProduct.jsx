import React, { useEffect, useState} from 'react'

import MetaData from '../layouts/MetaData'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updateProduct, getProductDetails, clearError } from '../../actions/productActions'
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants'

const UpdateProduct = ({ match, history }) => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [stock, setStock] = useState('')
    const [seller, setSeller] = useState('')
    const [images, setImages] = useState([])

    const [oldImages, setOldImages] = useState([])
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

    const { error, product } = useSelector(state => state.productDetails)
    const { loading, error: updateError, isUpdated } = useSelector(state => state.Product)

    const productId = match.params.id

    useEffect(() => {
        if (product && product._id !== productId) {
            dispatch(getProductDetails(productId))
        } else {
            setName(product.name)
            setPrice(product.price)
            setDescription(product.description)
            setCategory(product.category)
            setStock(product.stock)
            setSeller(product.seller)
            setOldImages(product.images)

        }

        if (error) {
            alert.error(error)
            dispatch(clearError())
        }

        if (updateError) {
            alert.error(updateError)
            dispatch(clearError())
        }

        if (isUpdated) {
            history.push('/admin/products')
            alert.success('Product updated successfully')
            dispatch({
                type: UPDATE_PRODUCT_RESET
            })
        }
    }, [dispatch, alert, error, isUpdated, product, updateError, productId, history])


    const submitHandler = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.set('name', name)
        formData.set('price', price)
        formData.set('description', description)
        formData.set('category', category)
        formData.set('stock', stock)
        formData.set('seller', seller)

        images.forEach(image => {
            formData.append('images', image)
        })
        dispatch(updateProduct(product._id, formData))
    }

    const changeImagesProduct = (e) => {
        const files = Array.from(e.target.files)

        setImagesPreview([])
        setImages([])
        setOldImages([])

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
            <MetaData title={"Update Product"} />
            <div className='row'>
                <div className='col-12 col-md-2'>
                    <Sidebar />
                </div>

                <div className='col-12 col-md-10'>
                    <>
                        <div className="my-5 wrapper">
                            <form className="shadow-lg" encType="multipart/form-data" onSubmit={submitHandler}>
                                <h1 className="mb-4">Update Product</h1>
                                <div className="form-group">
                                    <label htmlFor="name_field">Name</label>
                                    <input type="text" id="name_field" className="form-control" defaultValue = {name} onChange={e => setName(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="price_field">Price</label>
                                    <input type="text" id="price_field" className="form-control" defaultValue = {price} onChange={e => setPrice(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description_field">Description</label>
                                    <textarea className="form-control" id="description_field" rows={8} defaultValue = {description} onChange={e => setDescription(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="category_field">Category</label>
                                    <select defaultValue = {category} onChange={e => setCategory(e.target.value)} className="form-control" id="category_field">
                                        {categories.map(category => (
                                            <option key={category} calue={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="stock_field">Stock</label>
                                    <input type="number" id="stock_field" className="form-control" defaultValue = {stock} onChange={e => setStock(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="seller_field">Seller Name</label>
                                    <input type="text" id="seller_field" className="form-control" defaultValue = {seller} onChange={e => setSeller(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Images</label>
                                    <div className="custom-file">
                                        <input onChange={changeImagesProduct} type="file" name="product_images" className="custom-file-input" id="customFile" multiple />
                                        <label className="custom-file-label" htmlFor="customFile">
                                            Choose Images
                                        </label>
                                    </div>

                                    {oldImages && oldImages.map(img => (
                                        <img src={img.url} key={img.url} alt={img.url} className="mt-3 mr-2" width="55" height="52" />
                                    ))}

                                    {imagesPreview.map(img => (
                                        <img src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" />
                                    ))}
                                </div>
                                <button disabled={loading ? true : false} id="login_button" type="submit" className="py-3 btn btn-block">
                                    UPDATE
                                </button>
                            </form>
                        </div>
                    </>
                </div>
            </div>
        </>
    )
}

export default UpdateProduct
