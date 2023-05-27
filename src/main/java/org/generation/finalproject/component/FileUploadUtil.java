package org.generation.finalproject.component;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.*;
import com.azure.storage.blob.*;
import com.azure.storage.blob.models.*;
import org.springframework.web.multipart.MultipartFile;


public class FileUploadUtil {

    public static void saveFile(String uploadDir1, String fileName,
                                MultipartFile multipartFile) throws IOException {

        String connectStr2 = "DefaultEndpointsProtocol=https;AccountName=prodimage;AccountKey=XDWGtC0i6v9irWEEFmJUjiFQ5fxRmYn/14leryW2TonCMavajnZkbO5X0RuIacAoW0DaNe65LmZf+ASt6mghPg==;EndpointSuffix=core.windows.net";
        BlobServiceClient blobServiceClient = new BlobServiceClientBuilder().connectionString(connectStr2).buildClient();
        String containerName = "prodimage";


        BlobContainerClient containerClient = blobServiceClient.getBlobContainerClient(containerName);


        BlobClient blobClient = containerClient.getBlobClient(fileName);


        InputStream inputStream = multipartFile.getInputStream();
        blobClient.upload(inputStream);


//        Path uploadPath1 = Paths.get(uploadDir1);
//
//        try (InputStream inputStream = multipartFile.getInputStream()) {
//            Path filePath1 = uploadPath1.resolve(fileName);
//            Files.copy(inputStream, filePath1, StandardCopyOption.REPLACE_EXISTING);
//
//        } catch (IOException ioe) {
//            throw new IOException("Could not save image file: " + fileName, ioe);
//        }
    }
}
