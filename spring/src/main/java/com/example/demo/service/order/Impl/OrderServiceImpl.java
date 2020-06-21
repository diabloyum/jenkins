package com.example.demo.service.order.Impl;

import com.example.demo.dao.mapper.OrderModelMapper;
import com.example.demo.dao.model.OrderModel;
import com.example.demo.dao.model.UserModel;
import com.example.demo.service.order.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    OrderModelMapper orderModelMapper;
    @Override
    public OrderModel insert(OrderModel model) throws Exception {
//        if (!"".equals(model.getAccount()) && model.getAccount() != null) {
//            UserModel model1 = userModelMapper.selectByAccount(model.getAccount());
//            if (null != model1) {
//                throw new Exception("账号已存在");
//            }
//        }
//        if (!"".equals(model.getPassword()) && model.getPassword() != null) {
//            model.setPassword(DigestUtils.md5DigestAsHex(model.getPassword().getBytes()));
//        }
        int result = orderModelMapper.insert(model);
        if (result > 0) {
            return orderModelMapper.selectByPrimaryKey(model.getOrderId());
        } else {
            throw new Exception("添加订单失败");
        }
    }

    @Override
    public OrderModel update(OrderModel model) throws Exception {

        int result = orderModelMapper.updateByPrimaryKeySelective(model);
        if (result == 0) {
            throw new Exception("修改失败");
        }
        return orderModelMapper.selectByPrimaryKey(model.getOrderId());
    }

    @Override
    public int delete(Long id) {
        return orderModelMapper.deleteByPrimaryKey(id);
    }

    @Override
    public List<OrderModel> search() {
        return orderModelMapper.selectAll();
    }
}
