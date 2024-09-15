import express, { Request, Response } from 'express';
import multer from 'multer';
import { ProductManager } from '../manager/ProductManager'; // Import your ProductManager class

const adminRouter = express.Router();
export const productManager = new ProductManager(); // Initialize the ProductManager

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route to add a product
adminRouter.post('/', upload.single('file'), (req: Request, res: Response) => {
    const { product_name, price, details, company } = req.body;
    const imageBuffer: Buffer | null = req.file ? req.file.buffer : null; // Use Buffer

    try {
        const success = productManager.addProduct(product_name, Number(price), details, imageBuffer, company);
        if (success) {
            res.status(201).json({ message: 'Product added successfully' });
        } else {
            res.status(500).json({ error: 'Failed to add product' });
        }
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ error: 'Error adding product' });
    }
});

// Route to edit a product
adminRouter.post('/productEdit', upload.single('file'), (req: Request, res: Response) => {
    const { id, product_name, price, details, company } = req.body;
    const imageBuffer: Buffer | null = req.file ? req.file.buffer : null; // Use Buffer

    try {
        const success = productManager.editProduct(id, product_name, Number(price), details, imageBuffer, company);
        if (success) {
            res.status(200).json({ message: 'Product updated successfully' });
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Error updating product' });
    }
});


// product delete
adminRouter.post('/productDelete', async (req: Request, res: Response) => {
    const { id } = req.body;
    
    try {
      const success = productManager.deleteProduct(id);
      if (success) {
        res.status(200).json({ message: 'Product deleted successfully' });
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ error: 'Error deleting product' });
    }
});  

export default adminRouter;
