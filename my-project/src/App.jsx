import React from "react";
import { Routes, Route } from "react-router-dom";

import Front from "./FirstPage/Front";

import Trailing from "../Trailing";

import Beautys from "./Components/Products/Beautys/Beautys";
import Bag from "./Components/Products/Bag/Bag";
import Footwears from "./Components/Products/Footwears/Footwears";
import Grocerie from "./Components/Products/Grocerie/Grocerie";
import Electronic from "./Components/Products/Electronic/Electronic";
import Fashions from "./Components/Products/Fashions/Fashions";
import T from "../Trailing";
import Cart from "./AddTOCART/Cart";
import WishlistPage from "./Whislist/Wislits";
import AccountSection from "./Account/Account";
import AuthPage from "./USER/Authenticate";
import SearchResults from "./Search/SearchResults";
import CheckoutPage from "./AddTOCART/Checkout/CheckoutPage";
import Helpc from "./Components/Head/Helpc.jsx";
import Order from "./Components/Head/Order.jsx";
import Policy from "./Components/Foot/Help/Policy.jsx";
import Refunds from "./Components/Foot/Refunds/Refunds.jsx";
import ContactUs from "./Components/Foot/ContactUs/ContactUs.jsx";
import SizeGuide from "./Components/Foot/SizeGuide/SizeGuide.jsx";
import FAQs from "./Components/Foot/FAQs/FAQs.jsx";
import StoreLocatorPage from "./Components/Foot/StoreLocator/StoreLocator.jsx";
import AboutUsPage from "./Components/Foot/About/AboutUsPage.jsx";
import InvestorRelations from "./Components/Foot/About/InvestorRelations.jsx";
import Career from "./Components/Foot/About/Career.jsx";
import PressMedia from "./Components/Foot/About/PressMedia.jsx";
import SustainabilityPage from "./Components/Foot/About/SustainabilityPage.jsx";
import AffiliateProgram from "./Components/Foot/About/AffiliateProgram.jsx";
import BulkOrders from "./Components/Foot/About/BulkOrders.jsx";
import PartnerWithUs from "./Components/Foot/About/PartnerWithUs .jsx";
import TermsOfService from "./Components/Foot/Legal/TermsOfService.jsx";
import PrivacyPolicy from "./Components/Foot/Legal/PrivacyPolicy.jsx";
import CookiePolicyPage from "./Components/Foot/Legal/CookiePolicyPage.jsx";
import AccessibilityHub from "./Components/Foot/Legal/AccessibilityHub.jsx";
import ModernSlaveryAct from "./Components/Foot/Legal/ModernSlaveryAct.jsx";
import TaxStrategyPage from "./Components/Foot/Legal/TaxStrategyPage.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Front />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/account" element={<AuthPage />} />
        <Route path="/search" element={<SearchResults />} />
        {/* <Route path="/account" element={<AccountSection />} /> */}
        <Route path="/Fashion" element={<Fashions />} />
        <Route path="/Bags" element={<Bag />} />
        <Route path="/Beauty" element={<Beautys />} />
        <Route path="/Electronics" element={<Electronic />} />
        <Route path="/Footwear" element={<Footwears />} />
        <Route path="/Groceries" element={<Grocerie />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/T" element={<T />} />
        <Route path="/help" element={<Helpc />} />
        <Route path="/order" element={<Order />} />
        <Route path="/shipping" element={<Policy />} />
        <Route path="/returns" element={<Refunds />} />
        {/* <Route path="/track-order" element={<Refunds />} /> */}
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/size-guide" element={<SizeGuide />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/stores" element={<StoreLocatorPage />} />

        {/* ////////////////// About  */}
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/careers" element={<Career />} />
        <Route path="/press" element={<PressMedia />} />
        <Route path="/investors" element={<InvestorRelations />} />
        <Route path="/sustainability" element={<SustainabilityPage />} />
        <Route path="/affiliate" element={<AffiliateProgram />} />
        <Route path="/bulk-orders" element={<BulkOrders />} />
        <Route path="/partners" element={<PartnerWithUs />} />
        {/* /////////////////////////////////////////////////////////////// Legal */}
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/cookies" element={<CookiePolicyPage />} />
        <Route path="/accessibility" element={<AccessibilityHub />} />
        <Route path="/modern-slavery" element={<ModernSlaveryAct />} />
        <Route path="/tax-strategy" element={<TaxStrategyPage />} />
      </Routes>
    </>
  );
}
// WishlistPage
export default App;
