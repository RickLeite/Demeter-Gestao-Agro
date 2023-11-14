package com.demeter.gestaoagro.repository;

import com.demeter.gestaoagro.model.CadastroCliente;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CadastroClienteRepository extends MongoRepository<CadastroCliente, String> {

    // Adicionando métodos para buscar clientes por diferentes critérios
    List<CadastroCliente> findByNome(@Param("nome") String nome);
    CadastroCliente findByCpf(@Param("cpf") String cpf);
}

