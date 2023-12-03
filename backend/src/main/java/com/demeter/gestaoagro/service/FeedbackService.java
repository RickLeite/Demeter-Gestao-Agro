package com.demeter.gestaoagro.service;

import com.demeter.gestaoagro.model.FeedbackDocument;
import com.demeter.gestaoagro.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;

    @Autowired
    public FeedbackService(FeedbackRepository feedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }

    public void salvarFeedback(FeedbackDocument feedback) {
        feedbackRepository.save(feedback);
    }
}