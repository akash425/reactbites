import Header from "./components/header/header";
import LoginPage from "./components/login/loginPage";
import HomePage from "./components/homepage/homepage";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cart from "./components/Modals/CartModal/Cart";
import OrderForm from "./components/orderForm/orderform";

function App() {
  const [showingCart, setShowingCart] = useState(false);

  const openingCart = () => {
    setShowingCart(true);
  };
  const closingCart = () => {
    setShowingCart(false);
  };
  return (
    <Routes>
      <Route
        path="/"
        exact
        element={
          <>
            <Header openCart={openingCart} />
            <HomePage />
            {showingCart && <Cart closeCart={closingCart} />}
          </>
        }
      />
      <Route
        path="/order"
        exact
        element={
          <>
            <Header openCart={openingCart} />
            <OrderForm />
            {showingCart && <Cart closeCart={closingCart} />}
          </>
        }
      />
      <Route path="/login" exact element={<LoginPage />} />
    </Routes>
  );
}

export default App;
