package org.generation.finalproject.controller;

import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.BlobContainerClient;
import com.azure.storage.blob.BlobServiceClient;
import com.azure.storage.blob.BlobServiceClientBuilder;
import org.generation.finalproject.component.FileUploadUtil;
import org.generation.finalproject.controller.dto.ProductDTO;
import org.generation.finalproject.repository.entity.Product;
import org.generation.finalproject.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/product")
public class ProductController {

    @Value("${image.folder}")
    private String imageFolder;

    final ProductService productService;
    public ProductController(@Autowired ProductService productService) {
        this.productService = productService;
    }

    @CrossOrigin
    @GetMapping("/all")
    public Iterable<Product> getList() {
//                for (Product image: productService.all())
//        {
//            //productimages/t-shirt1.jpg
//            String setURL = imageFolder + "/" + image.getProductImage();
//            image.setProductImage(setURL);
//        }

        String connectStr2 = "DefaultEndpointsProtocol=https;AccountName=prodimage;AccountKey=XDWGtC0i6v9irWEEFmJUjiFQ5fxRmYn/14leryW2TonCMavajnZkbO5X0RuIacAoW0DaNe65LmZf+ASt6mghPg==;EndpointSuffix=core.windows.net";
        //System.out.println("Connect String: " + connectStr2);
        BlobServiceClient blobServiceClient = new BlobServiceClientBuilder().connectionString(connectStr2).buildClient();
        String containerName = "prodimage";
        BlobContainerClient containerClient = blobServiceClient.getBlobContainerClient(containerName);


        //productimagesping
        BlobClient blobClient = containerClient.getBlobClient(productService.all().get(0).getProductImage());
        System.out.println(blobClient);


        //Loop through the ArrayList of itemService.all() and append the Blob url to the imageUrl
        for (Product image: productService.all())
        {
            //path: productimagespring/prodimage/t-shirt1.jpg
            String setURL = blobClient.getAccountUrl() + "/" + containerName + "/" + image.getProductImage();
            image.setProductImage(setURL);
            System.out.println(setURL);
        }


        //return in the Controller represents a response to the Client

        //return in the Controller represent response to the client
        return this.productService.all();
    }

    @CrossOrigin
    @PostMapping("/add")
    public void save(@RequestParam(name = "productType", required = true) String productType,
                     @RequestParam(name = "productName", required = true) String productName,
                     @RequestParam(name = "productDescription", required = true) String productDescription,
                     @RequestParam(name = "productPrice", required = true) double productPrice,
                     @RequestParam(name = "productImage", required = true) String productImage,
                     @RequestParam("imagefile") MultipartFile multipartFile) throws IOException

    {

        String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
        FileUploadUtil.saveFile(imageFolder, fileName, multipartFile);


        ProductDTO listDTO = new ProductDTO(productType, productName, productDescription, productPrice, productImage);
        Product product = new Product(listDTO);
        productService.save(product);

    }

}