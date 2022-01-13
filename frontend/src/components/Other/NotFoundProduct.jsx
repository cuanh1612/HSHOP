import {Link} from 'react-router-dom'
import NotProduct from '../../asset/NotProduct.jpg'
export default function NotFoundProduct() {
    return (
        
        <>
        <div className="w-full bg-white">
            <div className="max-w-2xl px-4 py-16 mx-auto space-y-2 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <img src={NotProduct} alt="Not Have Product" className="mx-auto w-96" />
                <p className="text-xl font-semibold text-center">Your shopping cart is empty</p>
                <Link to="/" className="flex justify-center" style={{textDecoration: "none"}}>
                    <button className="p-2 font-semibold text-white transition-all duration-100 bg-gray-800 rounded-lg focus:outline-none hover:bg-gray-900">Back shop</button>
                </Link>
            </div>
        </div>
    </>
        
    )
}

