package com.demeter.gestaoagro.service;

import com.demeter.gestaoagro.model.Estoque;
import com.demeter.gestaoagro.repository.EstoqueRepository;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EstoqueService {

    private final EstoqueRepository estoqueRepository;

    public EstoqueService(EstoqueRepository estoqueRepository) {
        this.estoqueRepository = estoqueRepository;
    }

    public List<Estoque> getAllEstoque() {
        return estoqueRepository.findAll();
    }

    public Estoque saveEstoque(Estoque estoque) {
        return estoqueRepository.save(estoque);
    }

    public List<Estoque> saveEstoques(List<Estoque> estoques) {
        return estoqueRepository.saveAll(estoques);
    }

    public void removeEstoque(ObjectId id) {
        estoqueRepository.deleteById(id.toHexString());
    }
}
