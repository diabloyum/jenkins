<<<<<<< Updated upstream
package com.example.demo.dao.model;

import java.io.Serializable;
import java.util.Date;

/**
 * product_pic_info
 * @author 
 */
public class ProductPicInfo implements Serializable {
    private Long productPicId;

    private Long productId;

    private String picDesc;

    private String picUrl;

    private Integer isMaster;

    private Integer picOrder;

    private Date modifiedTime;

    private static final long serialVersionUID = 1L;

    public Long getProductPicId() {
        return productPicId;
    }

    public void setProductPicId(Long productPicId) {
        this.productPicId = productPicId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getPicDesc() {
        return picDesc;
    }

    public void setPicDesc(String picDesc) {
        this.picDesc = picDesc;
    }

    public String getPicUrl() {
        return picUrl;
    }

    public void setPicUrl(String picUrl) {
        this.picUrl = picUrl;
    }

    public Integer getIsMaster() {
        return isMaster;
    }

    public void setIsMaster(Integer isMaster) {
        this.isMaster = isMaster;
    }

    public Integer getPicOrder() {
        return picOrder;
    }

    public void setPicOrder(Integer picOrder) {
        this.picOrder = picOrder;
    }

    public Date getModifiedTime() {
        return modifiedTime;
    }

    public void setModifiedTime(Date modifiedTime) {
        this.modifiedTime = modifiedTime;
    }
=======
package com.example.demo.dao.model;

import java.io.Serializable;
import java.util.Date;

/**
 * product_pic_info
 * @author 
 */
public class ProductPicInfo implements Serializable {
    private Long productPicId;

    private Long productId;

    private String picDesc;

    private String picUrl;

    private Integer isMaster;

    private Integer picOrder;

    private Date modifiedTime;

    private static final long serialVersionUID = 1L;

    public Long getProductPicId() {
        return productPicId;
    }

    public void setProductPicId(Long productPicId) {
        this.productPicId = productPicId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getPicDesc() {
        return picDesc;
    }

    public void setPicDesc(String picDesc) {
        this.picDesc = picDesc;
    }

    public String getPicUrl() {
        return picUrl;
    }

    public void setPicUrl(String picUrl) {
        this.picUrl = picUrl;
    }

    public Integer getIsMaster() {
        return isMaster;
    }

    public void setIsMaster(Integer isMaster) {
        this.isMaster = isMaster;
    }

    public Integer getPicOrder() {
        return picOrder;
    }

    public void setPicOrder(Integer picOrder) {
        this.picOrder = picOrder;
    }

    public Date getModifiedTime() {
        return modifiedTime;
    }

    public void setModifiedTime(Date modifiedTime) {
        this.modifiedTime = modifiedTime;
    }
>>>>>>> Stashed changes
}