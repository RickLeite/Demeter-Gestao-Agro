package com.demeter.gestaoagro.repository;

import com.demeter.gestaoagro.model.Registro;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegistroRepository extends MongoRepository<Registro, String> {

}
