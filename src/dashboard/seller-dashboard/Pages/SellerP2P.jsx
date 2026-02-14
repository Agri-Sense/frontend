import React from "react";

import "../styles/seller.p2p.css"

const SellerP2P = () => {
  return (
    <>
    <label htmlFor="#" className="content-header">
        Available Orders
    </label>
    <div className="available-orders">
      <div className="options">
        <div className="filter">
          <span>
            <input type="text" placeholder="Search orders.."/>
          </span>
          <span>
            <button className="btn search-btn">
              <i className="bi bi-search"></i>
              <p>Browse Catalog</p>
            </button>
            <button className="btn filter-btn">
              <i className="bi bi-funnel"></i>
              <p>Filter</p>
            </button>
          </span>
        </div>
      </div>
      <div className="orders">
        {
          [1, 2, 3, 4, 5, 6].map((item) => {
            return(
              <div className="order" key={item}>
                <div className="info">
                  <div className="left">
                    <img src="https://farmapcdn.blob.core.windows.net/farmap/pfggg.png" alt="farmer" />
                  </div>
                  <div className="right">
                    <div className="product-title">Organic Rice</div>
                    <div className="text-muted orderID">
                      <span>Order ID: </span>
                      <span className="id">0210-051-0045</span>
                    </div>
                    <div className="createdAt">
                      <span>Created at: </span>
                      <span className="date">04 Jan, 2023</span>
                    </div>
                    
                    <div className="pricing">
                      <span className="text-muted">Price Per: </span>
                      <span className="pricePer text-success">Rs 40</span>
                    </div>
                    <div>
                      <span className="text-muted">Total Quantity: </span>
                      <span className="totalQuantity">240kg</span>
                    </div>
                    <div className="">
                      <span className="text-muted">Farmer: </span>
                      <span className="farmer">Bibek Shah</span>
                    </div>
                    <br />
                    <div>
                      <span className="text-muted">Location: </span>
                      <span className="farmerLocation">Kathmandu, Nepal</span>
                    </div>
                  </div>
                </div>
                <div className="actions">
                <button className="chat-btn">
                  <i className="bi bi-chat-left-dots"></i>
                  <p>Chat</p>
                </button>
                  <button className="buy-btn">
                    <i className="bi bi-cart"></i>
                    <p>Buy now</p>
                    </button>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
    </>
  );
};

export default SellerP2P;
