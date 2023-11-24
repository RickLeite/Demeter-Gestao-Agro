package com.demeter.gestaoagro.repository;

import com.demeter.gestaoagro.model.MyUserDocument;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<MyUserDocument, String> {
    Optional<MyUserDocument> findByUsername(String username);
}
