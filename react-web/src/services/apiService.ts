import {List} from "immutable";

import Category from "../models/Category";
import {Product} from "../models/Product";

// TODO move base url to config
const BASE_PRODUCTS_URL = "http://localhost:3000/api/store/products";

const tempCats: Category[] = [
    {
        id: "64f37a6038d4bb6edd24a07e",
        name: "Silk Dresses",
        description: "Collection of silk dresses for Pre-fall season.",
        editionName: "Pre-fall",
        editionDescription: "Collection for the fall season.",
        position: 0,
        slug: 'a'
    },
    {
        id: "64f37a6038d4bb6edd24a081",
        name: "Suits",
        description: "Collection of designer suits.",
        editionName: "Designer",
        editionDescription: "Designer collection.",
        position: 1,
        slug: 'b'
    },
    {
        id: "64f37a6038d4bb6edd24a085",
        name: "Festival",
        description: "Collection of suits for the summer season.",
        editionName: "Summer",
        editionDescription: "Collection for the summer season.",
        position: 2,
        slug: 'c'
    },
    {
        id: "64f37a6038d4bb6edd24a08a",
        name: "Showroom",
        description: "Collection of clothing on sale in our showroom.",
        editionName: "Sale",
        editionDescription: "Collection for the sale season.",
        position: 3,
        slug: 'd'
    },
];

export const fetchCategories = (): Promise<List<Category>> => {
    // TODO replace with real API call
    return new Promise<List<Category>>((resolve) => {
        resolve(List(tempCats));
    });
};

export const fetchProductById = async (productId: string) => {
    try {
        const response = await fetch(`${BASE_PRODUCTS_URL}/${productId}`);
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        const productData = await response.json();
        // TODO casting this now but need to make it a local Product
        return productData as Product;
    } catch (error) {
        throw new Error(`Error fetching product data: ${error}`);
    }
};