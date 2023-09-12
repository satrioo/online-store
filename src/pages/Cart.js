import CartComponent from '../components/CartList'
import { Navbar } from "../components";
import { ToastContainer } from 'react-toastify';

export default function Cart() {
  return (
    <>
    <Navbar />
    <div className=' w-10/12 block mx-auto'>
      <CartComponent />
      <ToastContainer />
    </div>
    </>
  )
}