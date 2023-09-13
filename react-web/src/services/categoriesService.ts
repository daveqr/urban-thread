import { List } from "immutable";

import Category from "../models/Category";

const tempCats: Category[] = [
    {
        id: "64f37a6038d4bb6edd24a07e",
        name: "Silk Dresses",
        description: "Collection of silk dresses for Pre-fall season.",
        editionName: "Pre-fall",
        editionDescription: "Collection for the fall season.",
    },
    {
        id: "64f37a6038d4bb6edd24a081",
        name: "Suits",
        description: "Collection of designer suits.",
        editionName: "Designer",
        editionDescription: "Designer collection.",
    },
    {
        id: "64f37a6038d4bb6edd24a085",
        name: "Festival",
        description: "Collection of suits for the summer season.",
        editionName: "Summer",
        editionDescription: "Collection for the summer season.",
    },
    {
        id: "64f37a6038d4bb6edd24a08a",
        name: "Showroom",
        description: "Collection of clothing on sale in our showroom.",
        editionName: "Sale",
        editionDescription: "Collection for the sale season.",
    },
];

export const fetchCategories = (): Promise<List<Category>> => {
    // TODO replace with real API call
    return new Promise<List<Category>>((resolve) => {
        resolve(List(tempCats));
    });
};