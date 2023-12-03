package com.demeter.gestaoagro.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.demeter.gestaoagro.model.FeedbackDocument;

public interface FeedbackRepository extends MongoRepository<FeedbackDocument, String> {
    // Outras consultas personalizadas podem ser adicionadas aqui, se necessário
}