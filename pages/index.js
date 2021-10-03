import Head from 'next/head'
import { useState, useEffect } from 'react'
import { client } from '../lib/shopify';


export const getStaticProps = async() => {

  const products = await client.product.fetchAll()
  const onSaleProducts = products.filter((product) => product.availableForSale == true) 
  const parsedProducts = JSON.parse(JSON.stringify(onSaleProducts));

  return {
    props: {
      products: parsedProducts
    }
  }
}


export default function Home({products}) {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>E-Commerce Store</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="max-w-lg">

      <p className="text-3xl font-bold">Chopitup</p>
      {
        products && products.map((product) => {
          return (
            <div className="m-1 p-3 bg-gray-400">
              <div className="">
                <img src={product.images[0].src} alt={product.images[0].altText} />
              </div>
              <div className="">
              <p className="font-bold">{product.title}</p>
              <p>{product.description}</p>
              </div>
            </div>
            )
          })
        }

      </main>
    </div>
  )
}
