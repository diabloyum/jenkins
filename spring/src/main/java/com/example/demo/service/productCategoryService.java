<<<<<<< Updated upstream
package com.example.demo.service;

import com.example.demo.dao.model.ProductCategory;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
@Mapper
public interface productCategoryService {

    ProductCategory insert(ProductCategory model) throws Exception;

    ProductCategory update(ProductCategory model) throws Exception;

    int delete(Long id) ;

    List<ProductCategory> search();

}
=======
package com.example.demo.service;

import com.example.demo.dao.model.ProductCategory;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
@Mapper
public interface productCategoryService {

    ProductCategory insert(ProductCategory model) throws Exception;

    ProductCategory update(ProductCategory model) throws Exception;

    int delete(Long id) ;

    List<ProductCategory> search();

}
>>>>>>> Stashed changes
