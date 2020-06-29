<<<<<<< Updated upstream
package com.example.demo.service.order;

import com.example.demo.dao.model.OrderModel;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface OrderService {
    OrderModel insert(OrderModel model) throws Exception;

    OrderModel update(OrderModel model) throws Exception;

    int delete(Long id) ;

    List<OrderModel> search();
}
=======
package com.example.demo.service.order;

import com.example.demo.dao.model.OrderModel;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface OrderService {
    OrderModel insert(OrderModel model) throws Exception;

    OrderModel update(OrderModel model) throws Exception;

    int delete(Long id) ;

    List<OrderModel> search();
}
>>>>>>> Stashed changes
