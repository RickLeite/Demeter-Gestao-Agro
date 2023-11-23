package com.demeter.gestaoagro.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.demeter.gestaoagro.model.MyUserDocument;

public interface UserRepository extends MongoRepository<MyUserDocument, String> {
    MyUserDocument findByUsername(String username);
}
