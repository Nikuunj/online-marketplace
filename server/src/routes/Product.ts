import express, { Request, Response } from 'express';
import { ProductManager } from '../manager/ProductManager'; 
import { Product } from '../manager/ProductManager'; 
import { productManager } from './AdminRouter'

const productRouter = express.Router();

productRouter.get('/', (req: Request, res: Response) => {
    try {
        const products: Product[] = productManager.getProducts();
        
        const productsWithImages = products.map(product => ({
            id: product.id,
            name: product.name,
            price: product.price,
            details: product.details,
            company: product.company,
            image: product.image ? product.image.toString('base64') : null // Convert Buffer to base64
        }));
        
        res.status(200).json(productsWithImages);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Error fetching products' });
    }
});

productRouter.get('/:id', (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const product: Product | undefined = productManager.getProductById(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json({
            id: product.id,
            name: product.name,
            price: product.price,
            details: product.details,
            company: product.company,
            image: product.image ? product.image.toString('base64') : null // Convert Buffer to base64
        });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Error fetching product' });
    }
});

export default productRouter;
