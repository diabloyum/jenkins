package com.example.demo.dao.model;

import java.io.Serializable;
import java.util.Date;

/**
 * order
 * @author
 */
public class OrderModel implements Serializable {
    private Long orderId;

    private Long orderNumber;

    private String productName;

    private Double orderPrice;

    private Date orderTime;

    private Integer orderActive;

    private Long orderStart;

    private String orderComment;

    private Long clientId;

    private Long developerId;

    private static final long serialVersionUID = 1L;

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Long getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(Long orderNumber) {
        this.orderNumber = orderNumber;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Double getOrderPrice() {
        return orderPrice;
    }

    public void setOrderPrice(Double orderPrice) {
        this.orderPrice = orderPrice;
    }

    public Date getOrderTime() {
        return orderTime;
    }

    public void setOrderTime(Date orderTime) {
        this.orderTime = orderTime;
    }

    public Integer getOrderActive() {
        return orderActive;
    }

    public void setOrderActive(Integer orderActive) {
        this.orderActive = orderActive;
    }

    public Long getOrderStart() {
        return orderStart;
    }

    public void setOrderStart(Long orderStart) {
        this.orderStart = orderStart;
    }

    public String getOrderComment() {
        return orderComment;
    }

    public void setOrderComment(String orderComment) {
        this.orderComment = orderComment;
    }

    public Long getClientId() {
        return clientId;
    }

    public void setClientId(Long clientId) {
        this.clientId = clientId;
    }

    public Long getDeveloperId() {
        return developerId;
    }

    public void setDeveloperId(Long developerId) {
        this.developerId = developerId;
    }
}
