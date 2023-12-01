package com.demeter.gestaoagro.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.demeter.gestaoagro.model.Venda;

import java.util.List;

@Repository
public interface VendaRepository extends MongoRepository<Venda, String> {
    List<Venda> findByCnpj(String cnpj);
}
