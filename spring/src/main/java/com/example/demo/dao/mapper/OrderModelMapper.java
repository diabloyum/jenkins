package com.example.demo.dao.mapper;

import com.example.demo.dao.model.OrderModel;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface OrderModelMapper {
    int deleteByPrimaryKey(Long orderId);

    int insert(OrderModel record);

    int insertSelective(OrderModel record);

    OrderModel selectByPrimaryKey(Long orderId);

    int updateByPrimaryKeySelective(OrderModel record);

    int updateByPrimaryKey(OrderModel record);

    List<OrderModel> selectAll();

    int updateComment(Long id);
}
