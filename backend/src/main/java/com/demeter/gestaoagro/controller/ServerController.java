package com.demeter.gestaoagro.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;

@Controller
public class ServerController {

    @Value("${EXserver.ip}")
    private String exServerIp;

    @Value("${EXserver.port}")
    private int exServerPort;


    @PostMapping("/sendMessage")
    public void sendMessage(@RequestBody String message) {

        try (Socket socket = new Socket(exServerIp, exServerPort);
             BufferedReader reader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
             PrintWriter writer = new PrintWriter(socket.getOutputStream(), true);
             BufferedReader consoleReader = new BufferedReader(new InputStreamReader(System.in))) {

            System.out.println("Connected to the server.");

            // Continue sending messages to the server
            while (true) {
                // Read a message from the console and send it to the server
                System.out.print("Enter a message to send to the server (type 'exit' to quit): ");
                String ServMessage = consoleReader.readLine();

                if ("exit".equalsIgnoreCase(ServMessage)) {
                    break;
                }

                writer.println(ServMessage);

                // Receive and print the response from the server
                String serverResponse = reader.readLine();
                System.out.println("Server response: " + serverResponse);
            }

        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}

