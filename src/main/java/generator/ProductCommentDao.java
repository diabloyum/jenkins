package generator;

import generator.ProductComment;

public interface ProductCommentDao {
    int deleteByPrimaryKey(Long commentId);

    int insert(ProductComment record);

    int insertSelective(ProductComment record);

    ProductComment selectByPrimaryKey(Long commentId);

    int updateByPrimaryKeySelective(ProductComment record);

    int updateByPrimaryKey(ProductComment record);
}