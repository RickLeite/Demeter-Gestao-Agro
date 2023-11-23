package com.demeter.gestaoagro.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;


@Controller
public class WebSocketController {

    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public String handleHelloMessage(String message) {
        // Log the incoming message
        System.out.println("Received message: " + message);

        // Process the incoming "hello" message and prepare a response
        String response = "Hello, " + "!";

        // Log the outgoing message
        System.out.println("Sending response: " + response);

        return response;
    }
}


