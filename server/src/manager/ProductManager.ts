
import { v4 as uuidv4 } from 'uuid';

export interface Product {
    id: string;
    name: string;
    price: number;
    details: string;
    image: Buffer | null; // Change Blob to Buffer
    company: string;
}

export class ProductManager {

    private products: Product[];
    private nextId: number;

    constructor() {
        this.products = [];
        this.nextId = 1; // Initialize the next ID for new products
    }

    addProduct(name: string, price: number, details: string, image: Buffer | null, company: string): boolean {
        try {
            const newProduct: Product = {
                id: uuidv4(),
                name,
                price,
                details,
                image,
                company
            };
            this.products.push(newProduct);
            return true;
        } catch (error) {
            console.error('Error adding product:', error);
            return false;
        }
    }

    editProduct(id: string, name: string, price: number, details: string, image: Buffer | null, company: string): boolean {
        try {
            const index = this.products.findIndex(p => p.id === id);
            if (index === -1) {
                throw new Error('Product not found');
            }
            this.products[index] = { id, name, price, details, image, company };
            return true;
        } catch (error) {
            console.error('Error updating product:', error);
            return false;
        }
    }

    deleteProduct(id: string): boolean {
        try {
            const index = this.products.findIndex(p => p.id === id);
            if (index === -1) {
                throw new Error('Product not found');
            }
            this.products.splice(index, 1);
            return true;
        } catch (error) {
            console.error('Error deleting product:', error);
            return false;
        }
    }

    // Method to get all products
    getProducts(): Product[] {
        return this.products;
    }

    // Method to get a product by id
    getProductById(id: string): Product | undefined {
        return this.products.find(p => p.id === id);
    }
}