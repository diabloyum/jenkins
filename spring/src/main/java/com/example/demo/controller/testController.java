package com.example.demo.controller;

import com.example.demo.dao.mapper.TestModelMapper;
import com.example.demo.dao.model.TestModel;
import com.example.demo.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = {"/test"})
public class testController{
    @Autowired
    TestService testService;
    @Autowired
    TestModelMapper testModelMapper;
    @PostMapping(value = {"/"})
    public ResponseEntity<TestModel> insert(@RequestBody TestModel testModel) throws Exception {
        TestModel result = testService.insert(testModel);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }
    @DeleteMapping(value = {"/"})
    public ResponseEntity<Integer> Delete(@RequestParam("tid") Long id) throws Exception {
        Integer result = testService.delete(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PutMapping(value = {"/"})
    public ResponseEntity<TestModel> update(@RequestBody TestModel testModel) throws Exception {
        TestModel result = testService.update(testModel);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    @GetMapping(value = {"/"})
    public ResponseEntity<List<TestModel>> selectAll()  {
        List<TestModel> result = testService.search();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
