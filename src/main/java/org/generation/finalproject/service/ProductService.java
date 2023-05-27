package org.generation.finalproject.service;

import org.generation.finalproject.repository.entity.Product;

import java.util.ArrayList;

public interface ProductService {

    Product save(Product product);

    void delete(int productId);

    ArrayList<Product> all();

    Product findById(int productId);

}
