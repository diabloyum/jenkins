package com.example.demo.service;

import com.example.demo.dao.model.TestModel;

import java.util.List;

public interface TestService {

    TestModel insert(TestModel model) throws Exception;

    TestModel update(TestModel model) throws Exception;

    int delete(Long id) throws Exception;

    List<TestModel> search();
}
