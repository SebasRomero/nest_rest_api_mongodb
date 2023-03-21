import { Body, Controller, Get, HttpStatus, NotFoundException, Param, Post, Res, Delete, Query, Put } from '@nestjs/common';
import { CreateProductDTO } from "./dto/product.dto";
import { ProductService } from "./product.service";

@Controller('products')
export class ProductController {

    constructor( private productService: ProductService){} 

    @Post('/create')
    async createProduct(@Res() res, @Body() createProductDTO: CreateProductDTO) {
        const product = await this.productService.createProduct(createProductDTO)
        return res.status(HttpStatus.OK).json({
            message: "Product Succesfully Created",
            product
        });
    }

    @Get('/')
    async getProducts(@Res() res) {
        const products = await this.productService.getProducts();
        return res.status(HttpStatus.OK).json({
            products
        })    
    }

    @Get('/:productID')
    async getProduct(@Res() res, @Param('productID') productID){
        const product = await this.productService.getProduct(productID)
        if (!product) throw new NotFoundException('Product does not exists')
        return res.status(HttpStatus.OK).json(product)
    }

    @Delete('/delete')
    async deleteProduct(@Res() res, @Query('productID') productID) {
        const productDeleted = await this.productService.deleteProduct(productID)
        if (!productDeleted) throw new NotFoundException('Product does not exists')
        return res.status(HttpStatus.OK).json({
            message: 'Product deleted succesfully',
            productDeleted
        }) 
    }

    @Put('/update')
    async updateProduct(@Res() res, @Body() createProductDTO: CreateProductDTO, @Query('productID') productID) {
        const updatedProduct = await this.productService.updateProduct(productID, createProductDTO)
        if (!updatedProduct) throw new NotFoundException('Product does not exists')
        return res.status(HttpStatus.OK).json({
            message: 'Product updated succesfully',
            updatedProduct
        }) 
    }
    }
