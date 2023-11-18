package com.demeter.gestaoagro;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

public class improvedServer {

    // Constants
    private static final int PORT = 12345;

    // Data structures to store connected clients and their IDs
    private static final Map<Integer, PrintWriter> clients = new HashMap<>();
    private static final AtomicInteger connectionIdGenerator = new AtomicInteger(1);
    private static Integer selectedClientId = null;

    // Entry point of the server application
    public static void main(String[] args) {
        try (ServerSocket serverSocket = new ServerSocket(PORT)) {
            System.out.println("Server is running and waiting for connections...");

            // Start a thread to read commands from the CLI concurrently with client connections
            new Thread(improvedServer::handleCommands).start();

            // Continuously accept incoming client connections
            while (true) {
                Socket clientSocket = serverSocket.accept();
                System.out.println("Client connected with ID " + connectionIdGenerator + " from: " + clientSocket.getInetAddress());

                // Create a new thread to handle each client
                new Thread(() -> handleClient(clientSocket)).start();
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // Method to handle communication with an individual client
    private static void handleClient(Socket clientSocket) {
        int clientId = connectionIdGenerator.getAndIncrement();

        try (
                BufferedReader reader = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
                PrintWriter writer = new PrintWriter(clientSocket.getOutputStream(), true)
        ) {
            // Store the client's PrintWriter in the map
            clients.put(clientId, writer);

            String message;
            // Continuously read messages from the client
            while ((message = reader.readLine()) != null) {
                System.out.println("Received from client " + clientId + ": " + message);

                // Check if the client wants to exit
                if ("EXIT".equalsIgnoreCase(message)) {
                    // Notify the client and close the connection
                    writer.println("Server: Chat is over. Goodbye!");
                    System.out.println("Closing connection with client " + clientId);
                    clients.remove(clientId);
                    if (selectedClientId != null && selectedClientId.equals(clientId)) {
                        selectedClientId = null; // Unselect the client if it was selected
                    }
                    break;
                }

                // Check if the client is selected before broadcasting the message
                broadcastMessage(message, clientId);
            }

        } catch (IOException e) {
            System.out.println("Client " + clientId + " disconnected.");
            clients.remove(clientId);
            if (selectedClientId != null && selectedClientId.equals(clientId)) {
                selectedClientId = null; // Unselect the client if it was selected
            }
        }
    }

    // Method to handle commands from the server's CLI
    private static void handleCommands() {
        try (BufferedReader consoleReader = new BufferedReader(new InputStreamReader(System.in))) {
            String command;
            // Continuously read commands from the CLI
            while ((command = consoleReader.readLine()) != null) {
                // Process different commands
                if (command.equalsIgnoreCase("list")) {
                    listClients();
                } else if (command.startsWith("select ")) {
                    handleSelectCommand(command);
                } else if (command.equals("unselect")) {
                    unselectClient();
                } else {
                    // Assume any other input is a message to send to the selected client
                    sendToSelectedClient(command);
                }
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // Method to list connected clients
    private static void listClients() {
        System.out.println("Connected clients:");
        clients.forEach((id, writer) -> {
            System.out.println("Client with ID " + id + (selectedClientId != null && selectedClientId.equals(id) ? " (selected)" : ""));
        });
    }

    // Method to handle the 'select' command
    private static void handleSelectCommand(String command) {
        String[] parts = command.split(" ", 2);
        if (parts.length == 2) {
            int clientId = Integer.parseInt(parts[1]);
            selectClient(clientId);
        } else {
            System.out.println("Invalid command. Usage: select <clientId>");
        }
    }

    // Method to select a client by ID
    private static void selectClient(int clientId) {
        if (clients.containsKey(clientId)) {
            selectedClientId = clientId;
            System.out.println("Client with ID " + clientId + " selected.");
        } else {
            System.out.println("Client with ID " + clientId + " not found.");
        }
    }

    // Method to unselect the currently selected client
    private static void unselectClient() {
        selectedClientId = null;
        System.out.println("Client unselected.");
    }

    // Method to send a message to the selected client
    private static void sendToSelectedClient(String message) {
        if (selectedClientId != null) {
            PrintWriter clientWriter = clients.get(selectedClientId);
            if (clientWriter != null) {
                clientWriter.println("Server: " + message);
            } else {
                System.out.println("Selected client not found.");
            }
        } else {
            System.out.println("No client selected. Use 'select <clientId>' to select a client.");
        }
    }

    // Method to broadcast a message to all clients or the selected client
    private static void broadcastMessage(String message, int clientId) {
        if (selectedClientId == null) {
            System.out.println("No client selected. Use 'select <clientId>' to select a client.");
        } else if (selectedClientId.equals(clientId)) {
            System.out.println("Broadcasting message from client " + clientId + ": " + message);
            clients.values().forEach(writer -> writer.println(message));
        }
    }
}
