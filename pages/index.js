import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { client } from '../lib/shopify';


export const getStaticProps = async (context) => {

  const products = await client.product.fetchAll()
  const onSaleProducts = products.filter((product) => product.availableForSale == true) 
  const parsedProducts = JSON.parse(JSON.stringify(onSaleProducts));

  return {
    props: {
      productList: parsedProducts
    }
  }
}


export default function Home({productList}) {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>E-Commerce Store</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="max-w-lg">

      <p className="text-3xl font-bold">Chopitup</p>
      {
        productList && productList.map((product, idx) => {
          return (
            <div className="m-1 p-3 bg-gray-400" key={idx}>
              <div className="mb-2">
                <img src={product.images[0].src} alt={product.images[0].altText} />
              </div>
              <div className="">
              <p className="font-bold">{product.title}</p>
              <p className="mb-2">{product.description}</p>
              <Link href={`/product/${product.id}`}>
                <button className="py-1 px-3 bg-indigo-500 rounded">See More...</button>
              </Link>
              </div>
            </div>
            )
          })
        }

      </main>
    </div>
  )
}
