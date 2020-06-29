<<<<<<< Updated upstream
package com.example.demo.service;

import com.example.demo.dao.model.ProductInfo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;


public interface Product_InfoService {

    ProductInfo insert(ProductInfo model) throws Exception;

    ProductInfo update(ProductInfo model) throws Exception;

    int delete(Long id) ;

    List<ProductInfo> search();


}
=======
package com.example.demo.service;

import com.example.demo.dao.model.ProductInfo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;


public interface Product_InfoService {

    ProductInfo insert(ProductInfo model) throws Exception;

    ProductInfo update(ProductInfo model) throws Exception;

    int delete(Long id) ;

    List<ProductInfo> search();


}
>>>>>>> Stashed changes
