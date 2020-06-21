package com.example.demo.dao.mapper;

import com.example.demo.dao.model.UserModel;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
@Mapper
public interface UserModelMapper {
    int deleteByPrimaryKey(Long uid);

    int insert(UserModel record);

    int insertSelective(UserModel record);

    UserModel selectByPrimaryKey(Long uid);

    int updateByPrimaryKeySelective(UserModel record);

    int updateByPrimaryKey(UserModel record);

    List<UserModel> selectAll();

    UserModel selectByAccount(String account);

    UserModel recovery(UserModel model);

    UserModel login(UserModel model);
}
