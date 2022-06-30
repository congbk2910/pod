import Layout from "@components/layout";
import ProductCard from "@components/product-card";
import Scene from "@components/scene";
import LayeredNavigation from "@components/layered-navigation";
import Pagination from "@components/pagination";
import { SimpleGrid, Container, Flex, Box, Skeleton } from "@chakra-ui/react";

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

const CategoryPage = ({ products, categories, tags, query, loading }: any) => {
  const title = query.slug.charAt(0).toUpperCase() + query.slug.slice(1);
  return (
    <Layout title={title} description="printcart catalog website.">
      <Flex w="100%" flexWrap="wrap">
        <Box
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
        </Box>
        <Box
          width={{
            base: "100%",
            md: "80%",
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
  );
};

export async function getServerSideProps({ query }: any) {
  const baseUrl = "http://localhost:8001/v1/catalog";
  const [requestProduct, requestCategory, requestTag] = await Promise.all([
    fetch(
      `${baseUrl}?cat=${query.slug}${
        query.limit ? "&limit=" + query.limit : ""
      }${query.page ? "&page=" + query.page : ""}${
        query.tag ? "&tag=" + query.tag : ""
      }`
    ),
    fetch(`${baseUrl}/categories?cat=${query.slug}`),
    fetch(`${baseUrl}/tags?cat=${query.slug}`),
  ]);
  const [products, categories, tags] = await Promise.all([
    requestProduct.json(),
    requestCategory.json(),
    requestTag.json(),
  ]);
  return { props: { products, categories, tags, query } };
}

export default CategoryPage;
