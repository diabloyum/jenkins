package com.example.demo.controller;

import com.example.demo.dao.mapper.ProductInfoDao;
import com.example.demo.dao.mapper.UserModelMapper;
import com.example.demo.dao.model.ProductInfo;
import com.example.demo.dao.model.TestModel;
import com.example.demo.service.Product_InfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = {"/product_info"})
public class productInfoController {
    @Autowired
    Product_InfoService product_infoServicer;
    @Autowired
    ProductInfoDao productInfoDao;
    @PostMapping(value = {"/"})
    public ResponseEntity<ProductInfo> insert(@RequestBody ProductInfo productInfo) throws Exception {
        ProductInfo result = product_infoServicer.insert(productInfo);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }
    @DeleteMapping(value = {"/"})
    public ResponseEntity<Integer> Delete(@RequestParam("tid") Long id) throws Exception {
        Integer result = product_infoServicer.delete(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PutMapping(value = {"/"})
    public ResponseEntity<ProductInfo> update(@RequestBody ProductInfo productInfo) throws Exception {
        ProductInfo result = product_infoServicer.update(productInfo);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    @GetMapping(value = {"/"})
    public ResponseEntity<List<ProductInfo>> selectAll()  {
        List<ProductInfo> result = product_infoServicer.search();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }


}
