package com.example.demo.service;
import com.example.demo.dao.model.UserModel;

import java.util.List;

public interface UserService {
    UserModel insert(UserModel model) throws Exception;

    UserModel update(UserModel model) throws Exception;

    int delete(Long id) ;

    List<UserModel> search();

    UserModel login(UserModel model) throws Exception;

    UserModel register(UserModel model) throws Exception;
}
