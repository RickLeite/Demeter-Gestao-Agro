package com.demeter.gestaoagro;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;

public class SimpleClient {
    public static void main(String[] args) {
        final String SERVER_IP = "127.0.0.1";
        final int PORT_NUMBER = 12345;

        try (Socket socket = new Socket(SERVER_IP, PORT_NUMBER);
             BufferedReader reader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
             PrintWriter writer = new PrintWriter(socket.getOutputStream(), true);
             BufferedReader consoleReader = new BufferedReader(new InputStreamReader(System.in)))
        {

            System.out.println("Connected to the server.");

            // Continue sending messages to the server
            while (true) {
                // Read a message from the console and send it to the server
                System.out.print("Enter a message to send to the server (type 'exit' to quit): ");
                String message = consoleReader.readLine();

                if ("exit".equalsIgnoreCase(message)) {
                    break;
                }

                writer.println(message);

                // Receive and print the response from the server
                String serverResponse = reader.readLine();
                System.out.println("Server response: " + serverResponse);
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
