package com.ssafy.fishfinder.service;


import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Transactional
@RequiredArgsConstructor
@Service
public class S3UploadServiceImpl implements S3UploadService{

    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    /**
     * MultipartFile을 전달받아 File로 전환한 후 S3에 업로드
     * @param multipartFile
     * @param dirName
     * @return
     * @throws IOException
     */
    public String upload(MultipartFile multipartFile, String dirName, Long id) throws IOException {
        File uploadFile = convert(multipartFile)
                .orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File 전환 실패"));
        return upload(uploadFile, dirName, id);
    }

    public String upload(File uploadFile, String dirName, Long id) {
        String uuid = UUID.nameUUIDFromBytes(uploadFile.getName().getBytes()).toString();
        String fileName = dirName + "/" + id.toString() + "/" + uuid + ".jpg";
        String uploadImageUrl = putS3(uploadFile, fileName);

        removeNewFile(uploadFile);  // 로컬에 생성된 File 삭제 (MultipartFile -> File 전환 하며 로컬에 파일 생성됨)

        return uploadImageUrl;      // 업로드된 파일의 S3 URL 주소 반환
    }

    public String uploadThumbnail(MultipartFile multipartFile, String dirName, Long id) throws IOException {
        File uploadFile = convert(multipartFile)
                .orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File 전환 실패"));

        BufferedImage image = ImageIO.read(uploadFile);
        int width = image.getWidth();
        int height = image.getHeight();

        // 100x100 이하인 경우 그대로 업로드
        if(width < 100 || height < 100) {
            return upload(uploadFile, dirName, id);
        }

        int newWidth = 100;
        int newHeight = 100;

        // 비율에 맞춘다
        if(width > height) {
            newWidth = (int) (width * (newHeight / (double) height));
        }else {
            newHeight = (int) (height * (newWidth / (double) width));
        }

        // 비율에 맞춰 100x100으로 크롭
        int cropWidth, cropHeight;
        if(newWidth > newHeight) {
            cropWidth = (newWidth - newHeight) / 2;
            cropHeight = 0;
        }else {
            cropWidth = 0;
            cropHeight = (newHeight - newWidth) / 2;
        }

        // 이미지 크롭
        BufferedImage newImage = new BufferedImage(newWidth, newHeight, BufferedImage.SCALE_SMOOTH);
        Graphics2D graphics2D = newImage.createGraphics();
        graphics2D.drawImage(image, 0, 0, newWidth, newHeight, null);
        graphics2D.dispose();
        newImage = newImage.getSubimage(cropWidth, cropHeight, 100, 100);

        File thumbnailFile = new File("thumbnail_" + uploadFile.getName());
        ImageIO.write(newImage, "jpg", thumbnailFile);

        removeNewFile(uploadFile);

        return upload(thumbnailFile, dirName, id);
    }

    public String putS3(File uploadFile, String fileName) {
        amazonS3Client.putObject(
                new PutObjectRequest(bucket, fileName, uploadFile)
                        .withCannedAcl(CannedAccessControlList.PublicRead)	// PublicRead 권한으로 업로드 됨
        );
        return amazonS3Client.getUrl(bucket, fileName).toString();
    }

    public void removeNewFile(File targetFile) {
        if(targetFile.delete()) {
            log.info("파일이 삭제되었습니다.");
        }else {
            log.info("파일이 삭제되지 못했습니다.");
        }
    }

    public Optional<File> convert(MultipartFile file) throws IOException {
        File convertFile = new File(file.getOriginalFilename());
        if(convertFile.createNewFile()) {
            try (FileOutputStream fos = new FileOutputStream(convertFile)) {
                fos.write(file.getBytes());
            }
            return Optional.of(convertFile);
        }
        return Optional.empty();
    }


}