package org.generation.finalproject.service;

import org.generation.finalproject.repository.ProductRepository;
import org.generation.finalproject.repository.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class ProductServiceMySQL implements ProductService {

    private final ProductRepository productRepository;

    public ProductServiceMySQL(@Autowired ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public Product save(Product product) {
        return productRepository.save(product);
    }

    @Override
    public void delete(int productId) {
        productRepository.deleteById(productId);
    }

    @Override
    public ArrayList<Product> all() {
        ArrayList<Product> result = new ArrayList<>();
        productRepository.findAll().forEach(result::add);
        return result;
    }

    @Override
    public Product findById(int productId) {
        Optional<Product> product = productRepository.findById(productId);
        Product productResponse = product.get();
        return productResponse;
    }

}
