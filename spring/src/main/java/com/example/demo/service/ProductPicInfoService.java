<<<<<<< Updated upstream
package com.example.demo.service;

import com.example.demo.dao.model.ProductPicInfo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
@Mapper
public interface ProductPicInfoService {
    ProductPicInfo insert(ProductPicInfo model) throws Exception;

    ProductPicInfo update(ProductPicInfo model) throws Exception;

    int delete(Long id) ;

    List<ProductPicInfo> search();


}
=======
package com.example.demo.service;

import com.example.demo.dao.model.ProductPicInfo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
@Mapper
public interface ProductPicInfoService {
    ProductPicInfo insert(ProductPicInfo model) throws Exception;

    ProductPicInfo update(ProductPicInfo model) throws Exception;

    int delete(Long id) ;

    List<ProductPicInfo> search();


}
>>>>>>> Stashed changes
