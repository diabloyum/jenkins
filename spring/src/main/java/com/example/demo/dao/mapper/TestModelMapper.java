package com.example.demo.dao.mapper;

import com.example.demo.dao.model.TestModel;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;


@Mapper
public interface TestModelMapper {
    int deleteByPrimaryKey(Long tid);

    int insert(TestModel record);

    int insertSelective(TestModel record);

    TestModel selectByPrimaryKey(Long tid);

    int updateByPrimaryKeySelective(TestModel record);

    int updateByPrimaryKey(TestModel record);

    List<TestModel> selectAll();
}
