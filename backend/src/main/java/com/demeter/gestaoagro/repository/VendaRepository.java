package com.demeter.gestaoagro.repository;

import com.demeter.gestaoagro.model.Venda;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

//ok agr.

@Repository
public interface VendaRepository extends MongoRepository<Venda, String> {
    List<Venda> findByCnpj(String cnpj);

    Optional<Venda> findByCodigoVenda(String codigoVenda);
}
