import Footer from "../_components/footer";
import Navbar from "../_components/navbar";

const WebLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default WebLayout;
