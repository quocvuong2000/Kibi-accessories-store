import DotRing from "../components/DotRing";

import { Footer } from "../components/Footer";
import Header from "../components/Header";

const UnRequireAuth = ({ children }) => {
  return (
    <>
      <Header />
      <DotRing />
      <div>{children}</div>

      <Footer />
    </>
  );
};

export default UnRequireAuth;
