package com.demeter.gestaoagro.repository;

import com.demeter.gestaoagro.model.Registro;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RegistroRepository extends MongoRepository<Registro, String> {
    Optional<Registro> findByEmailAndSenha(String email, String senha);
}


