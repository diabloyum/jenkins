<<<<<<< Updated upstream
package com.example.demo.service.impl;

import com.example.demo.dao.mapper.TestModelMapper;
import com.example.demo.dao.mapper.UserModelMapper;
import com.example.demo.dao.model.TestModel;
import com.example.demo.dao.model.UserModel;
import com.example.demo.service.TestService;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import java.util.List;

import static jdk.nashorn.internal.objects.Global.print;

@SuppressWarnings("ALL")
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserModelMapper userModelMapper;

    @Override
    public UserModel insert(UserModel model) throws Exception {
        if (!"".equals(model.getAccount()) && model.getAccount() != null) {
            UserModel model1 = userModelMapper.selectByAccount(model.getAccount());
            if (null != model1) {
                throw new Exception("账号已存在");
            }
        }
        if (!"".equals(model.getPassword()) && model.getPassword() != null) {
            model.setPassword(DigestUtils.md5DigestAsHex(model.getPassword().getBytes()));
        }
        int result = userModelMapper.insert(model);
        if (result > 0) {
            return userModelMapper.selectByPrimaryKey(model.getUid());
        } else {
            throw new Exception("注册失败");
        }
    }

    @Override
    public UserModel update(UserModel model) throws Exception {
        if (!"".equals(model.getAccount()) && model.getAccount() != null) {
            UserModel model1 = userModelMapper.selectByAccount(model.getAccount());
            if (null != model1 && !model1.getUid().equals(model.getUid())) {
                throw new Exception("账号已存在");
            }
            if (!"".equals(model.getPassword()) && model.getPassword() != null  && !model.getPassword().equals(model1.getPassword())) {
                model.setPassword(DigestUtils.md5DigestAsHex(model.getPassword().getBytes()));
            }
        }
        int result = userModelMapper.updateByPrimaryKeySelective(model);
        if (result == 0) {
            throw new Exception("修改失败");
        }
        return userModelMapper.selectByPrimaryKey(model.getUid());
    }

    @Override
    public int delete(Long id) {
        return userModelMapper.deleteByPrimaryKey(id);
    }

    @Override
    public List<UserModel> search() {
        return userModelMapper.selectAll();
    }

    @Override
    public UserModel login(UserModel model) throws Exception {
        if ("".equals(model.getAccount()) || "".equals(model.getPassword())) {
            throw new Exception("账号密码不能为空");
        }
        model.setPassword(DigestUtils.md5DigestAsHex(model.getPassword().getBytes()));
        UserModel result = userModelMapper.login(model);
        if (result == null) {
            throw new Exception("密码错误");
        }
        return result;
    }

    @Override
    public UserModel register(UserModel model) throws Exception {
        UserModel model1 = userModelMapper.recovery(model);
        if (null != model1) {
            throw new Exception("账号已存在");
        }
        if (!"".equals(model.getPassword()) && model.getPassword() != null) {
            model.setPassword(DigestUtils.md5DigestAsHex(model.getPassword().getBytes()));
        }
        int result = userModelMapper.insert(model);
        if (result < 1) {
            throw new Exception("注册失败");
        }
        return userModelMapper.selectByPrimaryKey(model.getUid());
    }
}
=======
package com.example.demo.service.impl;

import com.example.demo.dao.mapper.TestModelMapper;
import com.example.demo.dao.mapper.UserModelMapper;
import com.example.demo.dao.model.TestModel;
import com.example.demo.dao.model.UserModel;
import com.example.demo.service.TestService;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import java.util.List;

import static jdk.nashorn.internal.objects.Global.print;

@SuppressWarnings("ALL")
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserModelMapper userModelMapper;

    @Override
    public UserModel insert(UserModel model) throws Exception {
        if (!"".equals(model.getAccount()) && model.getAccount() != null) {
            UserModel model1 = userModelMapper.selectByAccount(model.getAccount());
            if (null != model1) {
                throw new Exception("账号已存在");
            }
        }
        if (!"".equals(model.getPassword()) && model.getPassword() != null) {
            model.setPassword(DigestUtils.md5DigestAsHex(model.getPassword().getBytes()));
        }
        int result = userModelMapper.insert(model);
        if (result > 0) {
            return userModelMapper.selectByPrimaryKey(model.getUid());
        } else {
            throw new Exception("注册失败");
        }
    }

    @Override
    public UserModel update(UserModel model) throws Exception {
        if (!"".equals(model.getAccount()) && model.getAccount() != null) {
            UserModel model1 = userModelMapper.selectByAccount(model.getAccount());
            if (null != model1 && !model1.getUid().equals(model.getUid())) {
                throw new Exception("账号已存在");
            }
            if (!"".equals(model.getPassword()) && model.getPassword() != null  && !model.getPassword().equals(model1.getPassword())) {
                model.setPassword(DigestUtils.md5DigestAsHex(model.getPassword().getBytes()));
            }
        }
        int result = userModelMapper.updateByPrimaryKeySelective(model);
        if (result == 0) {
            throw new Exception("修改失败");
        }
        return userModelMapper.selectByPrimaryKey(model.getUid());
    }

    @Override
    public int delete(Long id) {
        return userModelMapper.deleteByPrimaryKey(id);
    }

    @Override
    public List<UserModel> search() {
        return userModelMapper.selectAll();
    }

    @Override
    public UserModel login(UserModel model) throws Exception {
        if ("".equals(model.getAccount()) || "".equals(model.getPassword())) {
            throw new Exception("账号密码不能为空");
        }
        model.setPassword(DigestUtils.md5DigestAsHex(model.getPassword().getBytes()));
        UserModel result = userModelMapper.login(model);
        if (result == null) {
            throw new Exception("密码错误");
        }
        return result;
    }

    @Override
    public UserModel register(UserModel model) throws Exception {
        UserModel model1 = userModelMapper.recovery(model);
        if (null != model1) {
            throw new Exception("账号已存在");
        }
        if (!"".equals(model.getPassword()) && model.getPassword() != null) {
            model.setPassword(DigestUtils.md5DigestAsHex(model.getPassword().getBytes()));
        }
        int result = userModelMapper.insert(model);
        if (result < 1) {
            throw new Exception("注册失败");
        }
        return userModelMapper.selectByPrimaryKey(model.getUid());
    }
}
>>>>>>> Stashed changes
