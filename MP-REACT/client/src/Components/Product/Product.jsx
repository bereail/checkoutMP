import "./Product.css";
import img from "../../assets/dibujo.jpg";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import axios from "axios"
import { useState } from "react";


const Product = () => {
  const [preferenceId, setPreferenceId] = useState(null);

  initMercadoPago('APP_USR-70da26e9-4bcb-4a7d-b1db-835f42ae57a2', {
    locale: "es-AR"
  });


  //enviammos los datos del producto y crea el id de la preferencia
  const createPreference = async () => {
    try {
      const response = await axios.post("https://localhost:3000/create_preference",{
        title: "coca",
        quantity: 1,
        price: 100,
      });
      
      const {id} = response.data;
      return id;      
    } catch (error) {
      console.log(error);
    }
  };

  //invoca la funcion createPreference y guardo el id
  const handleBuy = async () => {
    const id = await createPreference();
    if(id) {
      setPreferenceId(id);
    }
  }

    return (
      <div className="card-product-container">
        <div className="card-product">
          <div className="card">
            <img src={img} alt="Product Image" />  
              <h3>Product</h3>
              <p className="price">$100</p>
              <button onClick={handleBuy}>Buy</button>      
              {preferenceId &&  <Wallet initialization={{ preferenceId: preferenceId}}  customization={{ texts:{ valueProp: 'smart_option'}}} /> }            

          </div>
        </div>
      </div>
    );
  };
  
  export default Product;
  