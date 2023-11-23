package com.demeter.gestaoagro.controller;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

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


