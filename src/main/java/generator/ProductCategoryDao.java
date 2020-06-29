package generator;

import generator.ProductCategory;

public interface ProductCategoryDao {
    int deleteByPrimaryKey(Long categoryId);

    int insert(ProductCategory record);

    int insertSelective(ProductCategory record);

    ProductCategory selectByPrimaryKey(Long categoryId);

    int updateByPrimaryKeySelective(ProductCategory record);

    int updateByPrimaryKey(ProductCategory record);
}