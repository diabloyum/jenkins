<<<<<<< Updated upstream
package com.example.demo.controller.order;

import com.example.demo.dao.model.OrderModel;
import com.example.demo.dao.model.TestModel;
import com.example.demo.service.order.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = {"/order"})
public class orderController {

    @Autowired
    OrderService orderService;

    @PostMapping(value = {"/"})
    public ResponseEntity<OrderModel> insert(@RequestBody OrderModel orderModel) throws Exception {
        OrderModel result = orderService.insert(orderModel);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @DeleteMapping(value = {"/"})
    public ResponseEntity<Integer> Delete(@RequestParam("id") Long id) throws Exception {
        Integer result = orderService.delete(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PutMapping(value = {"/"})
    public ResponseEntity<OrderModel> update(@RequestBody OrderModel orderModel) throws Exception {
        OrderModel result = orderService.update(orderModel);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping(value = {"/"})
    public ResponseEntity<List<OrderModel>> selectAll()  {
        List<OrderModel> result = orderService.search();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
=======
package com.example.demo.controller.order;

import com.example.demo.dao.model.OrderModel;
import com.example.demo.dao.model.TestModel;
import com.example.demo.service.order.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = {"/order"})
public class orderController {

    @Autowired
    OrderService orderService;

    @PostMapping(value = {"/"})
    public ResponseEntity<OrderModel> insert(@RequestBody OrderModel orderModel) throws Exception {
        OrderModel result = orderService.insert(orderModel);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @DeleteMapping(value = {"/"})
    public ResponseEntity<Integer> Delete(@RequestParam("id") Long id) throws Exception {
        Integer result = orderService.delete(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PutMapping(value = {"/"})
    public ResponseEntity<OrderModel> update(@RequestBody OrderModel orderModel) throws Exception {
        OrderModel result = orderService.update(orderModel);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping(value = {"/"})
    public ResponseEntity<List<OrderModel>> selectAll()  {
        List<OrderModel> result = orderService.search();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
>>>>>>> Stashed changes
