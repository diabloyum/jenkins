package com.example.demo.controller;

import com.example.demo.dao.mapper.ProductCategoryDao;
import com.example.demo.dao.mapper.TestModelMapper;
import com.example.demo.dao.model.ProductCategory;
import com.example.demo.dao.model.TestModel;
import com.example.demo.service.productCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = {"/product_category"})
public class productcategoryController {

    @Autowired
    productCategoryService productCategoryService;




    @PostMapping(value = {"/"})
    public ResponseEntity<ProductCategory> insert(@RequestBody ProductCategory productCategory) throws Exception {
        ProductCategory result = productCategoryService.insert(productCategory);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }
    @DeleteMapping(value = {"/"})
    public ResponseEntity<Integer> Delete(@RequestParam("tid") Long id) throws Exception {
        Integer result = productCategoryService.delete(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PutMapping(value = {"/"})
    public ResponseEntity<ProductCategory> update(@RequestBody ProductCategory  productCategory) throws Exception {
        ProductCategory result = productCategoryService.update( productCategory);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    @GetMapping(value = {"/"})
    public ResponseEntity<List<ProductCategory>> selectAll()  {
        List<ProductCategory> result = productCategoryService.search();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
