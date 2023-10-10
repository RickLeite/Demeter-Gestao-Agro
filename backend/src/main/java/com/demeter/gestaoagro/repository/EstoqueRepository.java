package com.demeter.gestaoagro.repository;

import java.util.List;

import com.demeter.gestaoagro.model.Estoque;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "estoque", path = "estoque")
public interface EstoqueRepository extends MongoRepository<Estoque, String> {

    List<Estoque> findByNomeProduto(@Param("nomeProduto") String nomeProduto);

}