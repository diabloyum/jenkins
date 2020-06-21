package com.example.demo.service.impl;

import com.example.demo.dao.mapper.TestModelMapper;
import com.example.demo.dao.model.TestModel;
import com.example.demo.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@SuppressWarnings("ALL")
@Service
public class TestServiceImpl implements TestService {
    @Autowired
    TestModelMapper testModelMapper;

    @Override
    public TestModel insert(TestModel model) throws Exception {
        int result = testModelMapper.insert(model);
        if (result > 0) {
            return testModelMapper.selectByPrimaryKey(model.getTid());
        } else {
            throw new Exception("添加失败");

        }
    }

    @Override
    public TestModel update(TestModel model) throws Exception {
        int result = testModelMapper.updateByPrimaryKeySelective(model);
        if (result == 0) {
            throw new Exception("修改失败");
        }
        return testModelMapper.selectByPrimaryKey(model.getTid());
    }

    @Override
    public int delete(Long id) throws Exception {
        int result = testModelMapper.deleteByPrimaryKey(id);
        if (result == 0) {
            throw new Exception("删除失败!");
        }
        return result;
    }


    @Override
    public List<TestModel> search() {
        return testModelMapper.selectAll();
    }
}
