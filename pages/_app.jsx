import '../styles/globals.css';
import { useState, useEffect } from 'react';
import SideBar from '../components/SideBar';
//function
function MyApp({ Component, pageProps }) {
  //hooks
  const [isSSR, setisSSR] = useState(true);
  useEffect(() => {
    setisSSR(false);
  }, []);
  if (isSSR) return null;
  //return
  return (
    <div className="flex overflow-auto">
      <div className="h-[100vh] overflow-scroll ">
        <SideBar />
      </div>

      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
