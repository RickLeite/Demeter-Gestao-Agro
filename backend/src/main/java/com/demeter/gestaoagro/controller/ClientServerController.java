package com.demeter.gestaoagro.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ClientServerController {

    @PostMapping("/processData")
    public String processData(@RequestBody String data) {
        // Process the received data as needed
        System.out.println("Received data: " + data);
        return "Data received successfully!";
    }
}
