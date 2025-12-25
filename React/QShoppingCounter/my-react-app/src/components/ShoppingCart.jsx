import { useState } from "react";

export function ProductCard(){
    const UNIT_Price= 29.99;
    const [quantity, setQuantity]= useState(1)


    const isBulkDiscount= quantity >= 5;
    const discountRate= isBulkDiscount ? 0.1 : 0;

    const subTotal= quantity * UNIT_Price;
    const discountAmount= subTotal* discountRate;
    const total = subTotal- discountAmount;

    return(
    <>
    <div style={{ border: "1px solid #ccc", padding: 16, width: 300 }}>
        <h3>Product</h3>
        <p>Unit Price :${UNIT_Price}</p>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button onClick={()=> setQuantity(q=> Math.max(1, q-1))}>
                -
            </button>
            <span>{quantity}</span>
            <button onClick={()=> setQuantity(q=> q + 1)}>+</button>
        </div>

        {isBulkDiscount && (
            <p style={{color: "green", marginTop:8}}>🎉 Bulk Discount Applied(10% OFF)</p>
        )}
        <hr/>

        <p>Subtotal: {subTotal.toFixed(2)}</p>
        {isBulkDiscount && (
            <p>Discount: -${discountAmount.toFixed(2)}</p>
        )}
        <h4>Total: ${total.toFixed(2)}</h4>
    </div>
    </>
    )
}