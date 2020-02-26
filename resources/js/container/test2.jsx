import React from "react";
import {ContextStore} from "./testContainer";

function Orders() {
    const { orders, dispatch } = React.useContext(ContextStore);
    return (
      <div>
        {orders.map(order => (
          <div key={order.id}>ORDER - {order.id}</div>
        ))}
        <button onClick={() => dispatch({ type: "ADD_ORDER" })}>ADD ORDER</button>
      </div>
    );
  }
export default Orders;