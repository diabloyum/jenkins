package com.example.demo.dao.mapper;

import com.example.demo.dao.model.ProductPicInfo;

public interface ProductPicInfoDao {
    int deleteByPrimaryKey(Long productPicId);

    int insert(ProductPicInfo record);

    int insertSelective(ProductPicInfo record);

    ProductPicInfo selectByPrimaryKey(Long productPicId);

    int updateByPrimaryKeySelective(ProductPicInfo record);

    int updateByPrimaryKey(ProductPicInfo record);
}