package com.geeks4learning.cms.util;

import java.io.ByteArrayOutputStream;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

public class FileResizingUtil {
  
    public static byte[] compressFile(byte[] data) {
        Deflater deflater = new Deflater();
        deflater.setLevel(Deflater.BEST_COMPRESSION);
        deflater.setInput(data);
        deflater.finish();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] tmp = new byte[4*1024];
        while (!deflater.finished()) {
            int size = deflater.deflate(tmp);
            outputStream.write(tmp, 0, size);
        }
        try {
            outputStream.close();
        } catch (Exception ignored) {
        }
        return outputStream.toByteArray();
    }



    public static byte[] decompressFile(byte[] data) {
        Inflater inflater = new Inflater();
        inflater.setInput(data);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] tmp = new byte[4*1024];
        try {
            while (!inflater.finished()) {
                int count = inflater.inflate(tmp);
                outputStream.write(tmp, 0, count);
            }
            outputStream.close();
        } catch (Exception ignored) {
        }
        return outputStream.toByteArray();
    }

   //   private byte[] compressData(byte[] data) throws IOException {
   //      ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
   //      GZIPOutputStream gzipOutputStream = new GZIPOutputStream(outputStream);
   //      gzipOutputStream.write(data);
   //      gzipOutputStream.close();
   //      return outputStream.toByteArray();
   //  }

   //  private byte[] decompressData(byte[] compressedData) throws IOException {
   //      ByteArrayInputStream inputStream = new ByteArrayInputStream(compressedData);
   //      GZIPInputStream gzipInputStream = new GZIPInputStream(inputStream);
   //      ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
   //      byte[] buffer = new byte[1024];
   //      int len;
   //      while ((len = gzipInputStream.read(buffer)) > 0) {
   //          outputStream.write(buffer, 0, len);
   //      }
   //      gzipInputStream.close();
   //      return outputStream.toByteArray();
   //  }

}

