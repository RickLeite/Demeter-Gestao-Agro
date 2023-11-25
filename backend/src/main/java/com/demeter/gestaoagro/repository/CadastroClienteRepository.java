package com.demeter.gestaoagro.repository;

import com.demeter.gestaoagro.model.CadastroCliente;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

@Repository
public interface CadastroClienteRepository extends MongoRepository<CadastroCliente, String> {
    // Mantenha os métodos existentes
    List<CadastroCliente> findByNome(@Param("nome") String nome);
    Optional<CadastroCliente> findByCpf(@Param("cpf") String cpf);
    Optional<CadastroCliente> findByCnpj(String cnpj);

    // Adicione o novo método para pesquisa por correspondência parcial
    @Query("{'nome': {$regex: ?0, $options: 'i'}}")
    List<CadastroCliente> findByNomeLike(String nome);
}
