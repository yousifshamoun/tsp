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
    <div className="w-full m-auto flex overflow-auto h-full">
      <div className="h-[92vh] overflow-scroll ">
        <SideBar />
      </div>

      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
