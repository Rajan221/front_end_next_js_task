export interface Product {
  title: string;
  description: string;
}

export interface Metadata {
  title: string;
  description: string;
  alternates: {
    canonical: string;
    languages: Record<string, string>;
  };
}

export const fetchData = async (): Promise<Product[]> => {
  const response = await fetch("https://fakestoreapi.com/products");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const generateMetadata = async (
  productId: number
): Promise<Metadata> => {
  try {
    const response = await fetch(
      `https://fakestoreapi.com/products/${productId}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const product: Product = await response.json();

    return {
      title: product.title,
      description: product.description,
      alternates: {
        canonical: `/post/${product.title}`,
        languages: {
          "en-CA": `en-CA/post/${product.title}`,
        },
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    throw error;
  }
};
