package com.demeter.gestaoagro;

import javax.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.mvc.method.RequestMappingInfo;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

import java.util.Arrays;
import java.util.Map;

@SpringBootApplication
public class GestaoagroApplication {

    public static void main(String[] args) {
        SpringApplication.run(GestaoagroApplication.class, args);
        System.out.println("Links: ");
    }

    @Bean
    public CommandLineRunner commandLineRunner(ApplicationContext ctx) {
        return args -> {
            System.out.println("Let's inspect the beans provided by Spring Boot:");
            String[] beanNames = ctx.getBeanDefinitionNames();
            Arrays.sort(beanNames);
            for (String beanName : beanNames) {
                System.out.println(beanName);
            }
        };
    }

    @Bean
    @Profile("!prod")
    public CommandLineRunner profileTest(Environment environment) {
        return args -> {
            System.out.println("Environment: " + environment.getProperty("environment"));
        };
    }

    @Bean
    public CommandLineRunner requestMappingInfo(RequestMappingHandlerMapping handlerMapping) {
        return args -> {
            handlerMapping.getHandlerMethods().forEach((key, value) -> {
                System.out.println("Request URI: " + key + ", Method: " + value);
            });
        };
    }

    @Component
    static class MyComponent {
        @Value("${server.port}")
        private int serverPort;

        @Autowired
        private RequestMappingHandlerMapping requestMappingHandlerMapping;

        @PostConstruct
        public void printServerPort() {
            try {
                System.out.println("Server is running on port: " + serverPort);

                Map<RequestMappingInfo, HandlerMethod> map = requestMappingHandlerMapping.getHandlerMethods();
                System.out.println("List of @GetMapping endpoints:");

                map.forEach((info, method) -> {
                    if (method.getMethod().isAnnotationPresent(GetMapping.class)) {
                        GetMapping getMapping = method.getMethodAnnotation(GetMapping.class);
                        if (getMapping != null && getMapping.value().length > 0) {
                            System.out.println("http://127.0.0.1:" + serverPort + getMapping.value()[0]);
                        } else {
                            System.err.println("Warning: @GetMapping annotation without a value");
                        }
                    }
                });
            } catch (Exception e) {
                System.err.println("Error in printServerPort: " + e.getMessage());
                e.printStackTrace();
            }
        }
    }
}
