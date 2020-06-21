package com.example.demo.controller;

import com.example.demo.dao.mapper.TestModelMapper;
import com.example.demo.dao.mapper.UserModelMapper;
import com.example.demo.dao.model.TestModel;
import com.example.demo.dao.model.UserModel;
import com.example.demo.dao.validate.QueryInputValidateGroup;
import com.example.demo.service.TestService;

import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = {"/user"})
public class userController {
    @Autowired
    UserService userService;
    @Autowired
    UserModelMapper userModelMapper;

    @ResponseBody
    @PostMapping(value = {"/login"})
    public ResponseEntity<UserModel> login(@RequestBody UserModel userModel) throws Exception {
        UserModel result = userService.login(userModel);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }


    @PostMapping(value = {"/"})
    public ResponseEntity<UserModel> insert(@Validated({QueryInputValidateGroup.class})
                                            @RequestBody UserModel userModel) throws Exception {
        UserModel result = userService.insert(userModel);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @PostMapping(value = {"/regist"})
    public ResponseEntity<UserModel> register(@Validated({QueryInputValidateGroup.class})
                                              @RequestBody UserModel userModel) throws Exception {
        UserModel result = userService.register(userModel);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @PutMapping(value = {"/"})
    public ResponseEntity<UserModel> update(@Validated({QueryInputValidateGroup.class}) @RequestBody UserModel userModel) throws Exception {
        UserModel result = userService.update(userModel);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping(value = {"/user"})
    public ResponseEntity<UserModel> selectByOptions(@RequestParam("account") String account) throws Exception {
        UserModel result = userModelMapper.selectByAccount(account);
        if (null == result) {
            throw new Exception("用户名错误");
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @DeleteMapping(value = {"/"})
    public ResponseEntity<Integer> logicalDelete(@RequestParam("id") Long id) throws Exception {
        Integer result = userService.delete(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping(value = {"/"})
    public ResponseEntity<List<UserModel>> selectAll()  {
        List<UserModel> result = userService.search();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping(value = {"/user"})
    public ResponseEntity<UserModel> selectByOptions(@RequestBody UserModel account) throws Exception {
        UserModel result = userModelMapper.recovery(account);
        if (null == result) {
            throw new Exception("用户名或邮箱错误");
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
