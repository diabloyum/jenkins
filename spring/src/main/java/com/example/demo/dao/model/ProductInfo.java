package com.example.demo.dao.model;

import java.io.Serializable;
import java.util.Date;

/**
 * product_info
 * @author 
 */
public class ProductInfo implements Serializable {
    private Long productId;

    private Integer productCore;

    /**
     * 产品名字
     */
    private String productName;

    /**
     * 一级标签
     */
    private Integer oneCategoryId;

    private Integer twoCategoryId;

    private Integer threeCategoryId;

    private String price;

    /**
     * 上架状态
     */
    private Integer publishStatus;

    /**
     * 审核状态
     */
    private Integer auditStatus;

    /**
     * 上架时间
     */
    private Date publishTime;

    /**
     * 开始日期
     */
    private Date userfulStart;

    /**
     * 结束日期
     */
    private Date userfulEnd;

    /**
     * 修改时间
     */
    private Date modifiedTime;

    private String prodectDesc;

    private static final long serialVersionUID = 1L;

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Integer getProductCore() {
        return productCore;
    }

    public void setProductCore(Integer productCore) {
        this.productCore = productCore;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Integer getOneCategoryId() {
        return oneCategoryId;
    }

    public void setOneCategoryId(Integer oneCategoryId) {
        this.oneCategoryId = oneCategoryId;
    }

    public Integer getTwoCategoryId() {
        return twoCategoryId;
    }

    public void setTwoCategoryId(Integer twoCategoryId) {
        this.twoCategoryId = twoCategoryId;
    }

    public Integer getThreeCategoryId() {
        return threeCategoryId;
    }

    public void setThreeCategoryId(Integer threeCategoryId) {
        this.threeCategoryId = threeCategoryId;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public Integer getPublishStatus() {
        return publishStatus;
    }

    public void setPublishStatus(Integer publishStatus) {
        this.publishStatus = publishStatus;
    }

    public Integer getAuditStatus() {
        return auditStatus;
    }

    public void setAuditStatus(Integer auditStatus) {
        this.auditStatus = auditStatus;
    }

    public Date getPublishTime() {
        return publishTime;
    }

    public void setPublishTime(Date publishTime) {
        this.publishTime = publishTime;
    }

    public Date getUserfulStart() {
        return userfulStart;
    }

    public void setUserfulStart(Date userfulStart) {
        this.userfulStart = userfulStart;
    }

    public Date getUserfulEnd() {
        return userfulEnd;
    }

    public void setUserfulEnd(Date userfulEnd) {
        this.userfulEnd = userfulEnd;
    }

    public Date getModifiedTime() {
        return modifiedTime;
    }

    public void setModifiedTime(Date modifiedTime) {
        this.modifiedTime = modifiedTime;
    }

    public String getProdectDesc() {
        return prodectDesc;
    }

    public void setProdectDesc(String prodectDesc) {
        this.prodectDesc = prodectDesc;
    }
}
