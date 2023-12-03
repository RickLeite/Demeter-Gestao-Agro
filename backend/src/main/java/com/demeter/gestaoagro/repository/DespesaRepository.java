package com.demeter.gestaoagro.repository;

import com.demeter.gestaoagro.model.Despesa;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DespesaRepository extends MongoRepository<Despesa, String> {
    // Aqui você pode definir consultas personalizadas, se necessário
}