package com.demeter.gestaoagro.repository;

import com.demeter.gestaoagro.model.Estoque;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EstoqueRepository extends MongoRepository<Estoque, String> {

    List<Estoque> findByNomeProduto(@Param("nomeProduto") String nomeProduto);

}
