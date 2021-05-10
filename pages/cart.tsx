import React from 'react'
import Image from 'next/image'

 const Cart = ({ cart }) => (
    <>
      <section>
        {cart.length ? <h1>Cart</h1> : <h1>Your cart is empty</h1>}
        {cart.map(prod => (
          <div key={prod.id}>
            <Image 
              src={`http:${prod.api_featured_image}`} 
              width={210}
              height={210}
              alt={prod.name}
            />
            <p>{prod.brand}</p>
            <p>{prod.name}</p>
            <p>{prod.price}</p>
          </div>
        ))}
        <h2>Total: {cart.length ? cart.map(product => Number(product.price)).reduce((a, b) => a + b ) : "0"}</h2>
      </section>
    <style jsx>{`
    section {
      margin: 0 30px;
    }
    div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 1000px;
      padding: 32px 24px 24px;
      margin-top: 20px;
      background: #fff;
      border: 1px solid #e2e6e9;
      transition: all 1s;
    }
    div:hover {
      box-shadow: 0 3px 13px rgba(23, 32, 49, 0.26);
    }
    h1 {
      font-size: 3rem;
      text-align: center;
    }
    div img {
      min-height: 220px;
      width: 220px;
      object-fit: contain;
    }
    p {
      font-size: 20px;
    }
  `}</style>
  </>
);

export default Cart;