<<<<<<< Updated upstream
package com.example.demo.controller;

import com.example.demo.dao.mapper.ProductPicInfoDao;
import com.example.demo.dao.model.ProductPicInfo;
import com.example.demo.dao.model.TestModel;
import com.example.demo.service.ProductPicInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = {"/product_pic"})
public class productPicInfoController {
    @Autowired
    ProductPicInfoService ProductPicInfoService;

    @PostMapping(value = {"/"})
    public ResponseEntity<ProductPicInfo> insert(@RequestBody ProductPicInfo productpicinfo) throws Exception {
        ProductPicInfo result = ProductPicInfoService.insert(productpicinfo);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }
    @DeleteMapping(value = {"/"})
    public ResponseEntity<Integer> Delete(@RequestParam("tid") Long id) throws Exception {
        Integer result = ProductPicInfoService.delete(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PutMapping(value = {"/"})
    public ResponseEntity<ProductPicInfo> update(@RequestBody ProductPicInfo productpicinfo) throws Exception {
        ProductPicInfo result = ProductPicInfoService.update(productpicinfo);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    @GetMapping(value = {"/"})
    public ResponseEntity<List<ProductPicInfo >> selectAll()  {
        List<ProductPicInfo > result = ProductPicInfoService.search();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
=======
package com.example.demo.controller;

import com.example.demo.dao.mapper.ProductPicInfoDao;
import com.example.demo.dao.model.ProductPicInfo;
import com.example.demo.dao.model.TestModel;
import com.example.demo.service.ProductPicInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = {"/product_pic"})
public class productPicInfoController {
    @Autowired
    ProductPicInfoService ProductPicInfoService;

    @PostMapping(value = {"/"})
    public ResponseEntity<ProductPicInfo> insert(@RequestBody ProductPicInfo productpicinfo) throws Exception {
        ProductPicInfo result = ProductPicInfoService.insert(productpicinfo);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }
    @DeleteMapping(value = {"/"})
    public ResponseEntity<Integer> Delete(@RequestParam("tid") Long id) throws Exception {
        Integer result = ProductPicInfoService.delete(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PutMapping(value = {"/"})
    public ResponseEntity<ProductPicInfo> update(@RequestBody ProductPicInfo productpicinfo) throws Exception {
        ProductPicInfo result = ProductPicInfoService.update(productpicinfo);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    @GetMapping(value = {"/"})
    public ResponseEntity<List<ProductPicInfo >> selectAll()  {
        List<ProductPicInfo > result = ProductPicInfoService.search();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
>>>>>>> Stashed changes
