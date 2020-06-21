package com.example.demo.dao.model;

import java.io.Serializable;

/**
 * test
 * @author 
 */
public class TestModel implements Serializable {
    private Long tid;

    private String name;

    private String detail;

    private Boolean active;

    private static final long serialVersionUID = 1L;

    public Long getTid() {
        return tid;
    }

    public void setTid(Long tid) {
        this.tid = tid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }
}