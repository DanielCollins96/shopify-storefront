import Client from 'shopify-buy';

export const client = Client.buildClient({
    domain: process.env.SHOPIFY_STORE_DOMAIN,
    storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_TOKEN
})

async function callShopify(query) {
    const fetchUrl = `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2021-01/graphql.json`;
  
    const fetchOptions = {
      endpoint: fetchUrl,
      method: "POST",
      headers: {
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    };

    try {
        const data = await fetch(fetchUrl, fetchOptions).then((response) =>
          response.json(),
        );
        return data;
      } catch (error) {
        throw new Error("Could not fetch products!");
      }
    }

export async function getProductWithImage() {
    const query = `
    {
        products(first: 5) {
          edges {
            node {
                id,
                images(first: 2) {
                edges {
                  node {
                    id,
                    originalSrc
                  }
                }
              }
            }
          }
        }
      }
    `
}