import Head from "next/head";
import styles from "../../styles/Home.module.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const Layout = ({ children, title = "Sobar Daktar" }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
