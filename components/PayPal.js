import React , {useEffect} from "react";
import ReactDOM from "react-dom"

const PayPalButton = paypal.Buttons.driver("react", { React, ReactDOM });

function PayPal({price}) {

  const createOrder = (data, actions) =>{
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: price,
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture();
  };

  return (
    <PayPalButton
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
    />
  );
}

export default PayPal