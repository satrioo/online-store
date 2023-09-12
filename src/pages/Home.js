import { Navbar, Product } from "../components";
import { ToastContainer } from 'react-toastify';
function Home() {
  return (
    <>
      <Navbar />
      <Product />
      <ToastContainer />
    </>
  )
}

export default Home