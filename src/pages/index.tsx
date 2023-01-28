import React from 'react'
import Head from 'next/head'
import Logo from '@/assets/img/logo.png'
import { Inter } from '@next/font/google'
import Image from 'next/image';
import { addDoc, collection } from 'firebase/firestore';
import { firestore} from '@/firebase/clientApp'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [email, setEmail] = React.useState("");
  const [loading,setLoading] = React.useState(false);

  const notifySuccess = (e: string) => {
    toast.success(`${e}!`, {
      position: toast.POSITION.TOP_CENTER
    });
  }

  const notifyError = (e: string) => {
    toast.error(`${e}!`, {
      position: toast.POSITION.TOP_CENTER
    });
  }
  
  const handelEmail = async() => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if ( re.test(email) ) {
      setLoading(true);
      const docRef = await addDoc(collection(firestore, "email_list"), {
        email
      });
      if(docRef.id !== ''){
        setEmail('')
        setLoading(false);
        notifySuccess("Your email has been successfully captured")
      };
    }
    else {
      notifyError('This is an ivalid email, please enter a valid email');
    }
  }

  return (
    <>
      <Head>
        <title>Just Work</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full relative flex h-[100vh] bg-gradient-to-r from-indigo-300 to-purple-400">
        <ToastContainer />
        <div className="w-11/12 sm:w-4/12 m-auto">
          <div className="w-full flex">
            <div className="w-3/5 sm:w-3/4 m-auto">
              <Image src={Logo} alt="company logo" />
            </div>
          </div>
          <div className="w-full text-white text-center my-6">
            <p>
              The platform that connects clients to the right service providers
              with full transparency and protection
            </p>
          </div>
          <div className="w-full flex">
            <div className="w-10/12 sm:w-9/12 m-auto relative flex">
              <input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="please enetr your email address"
                className="w-full placeholder:text-gray-100 text-white pl-3 pr-28 h-11 outline-none rounded py-3 bg-gray-700 mt-5"
              />
              <button
                onClick={handelEmail} 
                className="w-24 bg-white font-semibold flex hover:bg-gray-300 h-9 px-4 rounded absolute top-6 right-1">
                {loading ? <div className="loader m-auto"></div> : <p className="m-auto">Submit</p> }
              </button>
            </div>
          </div>
          <p className="text-center mt-3">
            Notify me when the application goes live
          </p>
        </div>
        <div className="w-full flex absolute bottom-0">
          <p className="text-white m-auto text-sm py-3">
            Powered by Mo& Co (PTY) Ltd
          </p>
        </div>
      </main>
    </>
  )
}
