package com.example.demo.service.impl;

import com.example.demo.dao.mapper.ProductInfoDao;
import com.example.demo.dao.model.ProductInfo;
import com.example.demo.service.Product_InfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@SuppressWarnings("ALL")
@Service
public class ProductInfoImpl implements Product_InfoService {
    @Autowired
    ProductInfoDao productInfoDao;

    @Override
    public ProductInfo insert(ProductInfo model) throws Exception {
        int result =productInfoDao.insert(model);
        if (result > 0) {
            return productInfoDao.selectByPrimaryKey(model.getProductId());
        } else {
            throw new Exception("添加失败");

        }
    }

    @Override
    public ProductInfo update(ProductInfo model) throws Exception {
        return null;
    }

    @Override
    public int delete(Long id) {
        return 0;
    }

    @Override
    public List<ProductInfo> search() {
        return productInfoDao.selectAll();
    }
}
