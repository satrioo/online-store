import { useSelector } from "react-redux";

function Summary() {
  const state = useSelector((state) => state.handleCart);
  let subtotal = 0;
  let shipping = 30.0;
  let totalItems = 0;
  state.map((item) => {
    return (subtotal += item.price * item.qty);
  });

  state.map((item) => {
    return (totalItems += item.qty);
  });

  return (
    <div className="mb-4 py-3 px-4 border border-gray-300 mt-5 rounded w-full">
      <div className="">
        <h5 className="mb-5">Order Summary</h5>
      </div>
      <div className="summary">
        <ul className="list-group list-group-flush">
          <li className="list-group-item px-0 pb-0">
            <span>Products ({totalItems})</span>
            <span>${Math.round(subtotal)}</span>
          </li>
          <li className="list-group-item px-0">
            <span>Shipping</span>
            <span>${shipping}</span>
          </li>
          <li className="list-group-item px-0 mb-3">
            <div>
              <strong>Total amount</strong>
            </div>
            <span>
              <strong>${Math.round(subtotal + shipping)}</strong>
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Summary