package com.demeter.gestaoagro.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;

@Controller
public class WebSocketController {

    private final SimpMessagingTemplate messagingTemplate;
    private int connectionCount = 0;

    public WebSocketController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/hello")
    public void handleHelloMessage(String message) {
        // Log the incoming message
        System.out.println("Received message: " + message);

        // Process the incoming "hello" message and prepare a response
        String response = "Hello, " + message + "!";

        // Log the outgoing message
        System.out.println("Sending response: " + response);

        // Create a new thread for handling the message
        new Thread(() -> handleIncomingMessage(message)).start();
    }

    private void handleIncomingMessage(String message) {
        // Simulate some time-consuming task
        try (Socket socket = new Socket("127.0.0.1", 12345);
             BufferedReader reader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
             PrintWriter writer = new PrintWriter(socket.getOutputStream(), true))
        {

            // Send the message to the server
            writer.println(message);
            System.out.println("Message sent to the server: " + message);

            // Receive and print the response from the server
            String serverResponse = reader.readLine();
            System.out.println("Server response: " + serverResponse);

            // Broadcast the response to all subscribers of the "/topic/receive" destination
            messagingTemplate.convertAndSend("/topic/receive", "Handled Message: " + message + ", Server Response: " + serverResponse);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}



