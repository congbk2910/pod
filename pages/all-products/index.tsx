import Layout from "@components/layout";
import ProductCard from "@components/product-card";
import Scene from "@components/scene";
import LayeredNavigation from "@components/layered-navigation";
import Pagination from "@components/pagination";
import { SimpleGrid, Container, Flex, Box, Skeleton } from "@chakra-ui/react";
import Search from "@components/search";

const defaultProducts = [
  {
    id: 1,
    product_image: {
      url: "https://dcisb67tbokpv.cloudfront.net/default/bag.png",
      alt: "Bag",
    },
    name: "Bag",
    url: "/bag",
    tag: ["Bag"],
  },
  {
    id: 2,
    product_image: {
      url: "https://dcisb67tbokpv.cloudfront.net/default/bag.png",
      alt: "Bag",
    },
    name: "Bag",
    url: "/bag",
    tag: ["Bag"],
  },
  {
    id: 3,
    product_image: {
      url: "https://dcisb67tbokpv.cloudfront.net/default/bag.png",
      alt: "Bag",
    },
    name: "Bag",
    url: "/bag",
    tag: ["Bag"],
  },
  {
    id: 4,
    product_image: {
      url: "https://dcisb67tbokpv.cloudfront.net/default/bag.png",
      alt: "Bag",
    },
    name: "Bag",
    url: "/bag",
    tag: ["Bag"],
  },
  {
    id: 5,
    product_image: {
      url: "https://dcisb67tbokpv.cloudfront.net/default/bag.png",
      alt: "Bag",
    },
    name: "Bag",
    url: "/bag",
    tag: ["Bag"],
  },
  {
    id: 6,
    product_image: {
      url: "https://dcisb67tbokpv.cloudfront.net/default/bag.png",
      alt: "Bag",
    },
    name: "Bag",
    url: "/bag",
    tag: ["Bag"],
  },
  {
    id: 7,
    product_image: {
      url: "https://dcisb67tbokpv.cloudfront.net/default/bag.png",
      alt: "Bag",
    },
    name: "Bag",
    url: "/bag",
    tag: ["Bag"],
  },
  {
    id: 8,
    product_image: {
      url: "https://dcisb67tbokpv.cloudfront.net/default/bag.png",
      alt: "Bag",
    },
    name: "Bag",
    url: "/bag",
    tag: ["Bag"],
  },
  {
    id: 9,
    product_image: {
      url: "https://dcisb67tbokpv.cloudfront.net/default/bag.png",
      alt: "Bag",
    },
    name: "Bag",
    url: "/bag",
    tag: ["Bag"],
  },
];

const Products = ({ products, loading }: any) => {
  return (
    <>
      <Container pt={15}>
        <Search />
      </Container>
      <Layout title="All Products" description="printcart catalog website.">
        <Flex w="100%" flexWrap="wrap">
          {/* <Box
          width={{
            base: "100%",
            md: "20%",
          }}
          px={4}
        >
          <LayeredNavigation
            categories={categories}
            tags={tags}
            query={query}
          />
        </Box> */}
          <Box
            width={{
              base: "100%",
              md: "100%",
            }}
            px={4}
          >
            <Scene title="" align="end">
              {!loading && products && (
                <SimpleGrid
                  columns={{ base: 1, sm: 2, md: 3 }}
                  gap={6}
                  p={2}
                  alignItems="stretch"
                  as="section"
                  w="100%"
                >
                  {products.data.map((product: any) => (
                    <ProductCard data={product} key={product.id} />
                  ))}
                </SimpleGrid>
              )}

              {loading && (
                <SimpleGrid
                  columns={{ base: 1, sm: 2, md: 3 }}
                  gap={6}
                  p={2}
                  alignItems="stretch"
                  as="section"
                  w="100%"
                >
                  {defaultProducts.map((product: any) => (
                    <Skeleton key={product.id}>
                      <ProductCard data={product} />
                    </Skeleton>
                  ))}
                </SimpleGrid>
              )}

              <Pagination
                itemsPerPage={products.meta.per_page}
                itemsLength={products.meta.total}
                currentPage={products.meta.current_page}
              />
            </Scene>
          </Box>
        </Flex>
      </Layout>
    </>
  );
};

export async function getServerSideProps() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_API_URL + "catalog";

  const res = await fetch(baseUrl);
  const products = await res.json();

  return { props: { products } };
}

export default Products;
