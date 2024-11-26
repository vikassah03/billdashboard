'use client'
import Head from 'next/head';
import InvoiceForm from './components/InvoiceForm';
// import InvoicesList from './components/InvoicesList';
import Greetings from './greetings';

export default function Home() {
  return (
    <div className='  min-h-screen'>
      <Head>
        <title>Invoice System</title>
        <meta name="description" content="Simple Invoice System using Next.js, Tailwind CSS, and Firebase" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className=" p-4 flex justify-between items-center bg-gradient-to-br from-black to-gray-400 sticky top-0">
            <img src="https://i.ibb.co/WzW1msY/logo1-2-2-removebg-preview.png" alt="" className="w-36 sm:w-40 md:w-48 lg:w-60 xl:w-60"/>
              <div className="text-white text-lg"><Greetings /></div> 
            </nav>
      <main className="p-4 bg-gray-500  min-h-screen">
        {/* <h1 className="text-3xl font-bold text-center mb-1 text-white">Invoice System</h1> */}
       
        <InvoiceForm />
        {/* <InvoicesList /> */}
      </main>
    </div>
  );
}
