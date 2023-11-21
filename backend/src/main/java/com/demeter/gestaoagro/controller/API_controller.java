package com.demeter.gestaoagro.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class API_controller {

//    @PostMapping("/create")
//    public String createPost(@RequestBody MyRequestModel requestModel) {
//        // Your logic to handle the POST request and process the data
//        // For example, you might save the data to a database
//        return "Post created successfully";
//    }


    @PostMapping("/create")
    public String createPost() {
        // Your logic to handle the POST request and process the data
        // For example, you might save the data to a database
        return "usuario criado";
    }


}
