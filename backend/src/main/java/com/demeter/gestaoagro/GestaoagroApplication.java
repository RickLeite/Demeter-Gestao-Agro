package com.demeter.gestaoagro;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.mvc.method.RequestMappingInfo;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

import java.util.Map;

@SpringBootApplication
public class GestaoagroApplication {

    @Autowired
    private RequestMappingHandlerMapping requestMappingHandlerMapping;

    public static void main(String[] args) {
        SpringApplication.run(GestaoagroApplication.class, args);
        System.out.println("Links: ");
    }

    @Component
    static
    class MyComponent {
        @Value("${server.port}")
        private int serverPort;

        @Autowired
        private Environment environment;

        @Autowired
        private RequestMappingHandlerMapping requestMappingHandlerMapping;

        @PostConstruct
        public void printServerPort() {
            System.out.println("Server is running on port: " + serverPort);

            Map<RequestMappingInfo, HandlerMethod> map = requestMappingHandlerMapping.getHandlerMethods();
            System.out.println("List of @GetMapping endpoints:");

            map.forEach((info, method) -> {
                if (method.getMethod().isAnnotationPresent(GetMapping.class)) {
                    GetMapping getMapping = method.getMethodAnnotation(GetMapping.class);
                    System.out.println("http://127.0.0.1:" + serverPort + getMapping.value()[0]);
                }
            });
        }
    }
}
