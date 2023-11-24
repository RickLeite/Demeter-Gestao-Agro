package com.demeter.gestaoagro.repository;

import com.demeter.gestaoagro.model.CadastroCliente;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import org.springframework.data.repository.query.Param;

@Repository
public interface CadastroClienteRepository extends MongoRepository<CadastroCliente, String> {
    List<CadastroCliente> findByNome(@Param("nome") String nome);

    Optional<CadastroCliente> findByCpf(@Param("cpf") String cpf);

    Optional<CadastroCliente> findByCnpj(String cnpj);
}