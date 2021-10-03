import { parse } from 'postcss';
import { client } from '../../lib/shopify';

export const getStaticProps = async ({params}) => {

    const product = await client.product.fetch(params?.productId)
    const parsedProduct = JSON.parse(JSON.stringify(product));
    
    return {
        props: {
            parsedProduct
        }
    }
} 

export const getStaticPaths = async () => {
    const products = await client.product.fetchAll()
    const paths = products.map((product) => ({
        params: {productId: product.id},
    }))

    return { paths, fallback: 'blocking'}
}

export default function Product({parsedProduct}) {
    return (
        <div>
            <p className="text-3xl">Hell Yeah {parsedProduct.title}</p>
            {parsedProduct?.images?.map((image) => {
                return <img src={image.src} alt={image.altText} />
            })}
        </div>
    )
}
