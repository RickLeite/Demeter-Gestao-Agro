package com.demeter.gestaoagro.controller;

import com.demeter.gestaoagro.model.FeedbackDocument;
import com.demeter.gestaoagro.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping; // Adicione esta importação
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class FeedbackController {

    private final FeedbackService feedbackService;

    @Autowired
    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @GetMapping("/salvar-feedback")
    public String salvarFeedbackPage() {
        return "cadastroFeedback";
    }

    @PostMapping("/salvar-feedback") // Corrija para usar o método POST
    public String salvarFeedback(@RequestBody FeedbackDocument feedback) {
        feedbackService.salvarFeedback(feedback);
        return "cadastroFeedback";
    }
}
