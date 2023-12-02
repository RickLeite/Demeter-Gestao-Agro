package com.demeter.gestaoagro.service;

import com.demeter.gestaoagro.model.Estoque;
import com.demeter.gestaoagro.repository.EstoqueRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ListaProdutoService {

    private final EstoqueRepository estoqueRepository;

    @Autowired
    public ListaProdutoService(EstoqueRepository estoqueRepository) {
        this.estoqueRepository = estoqueRepository;
    }

    public List<Estoque> listarTodosProdutos() {
        return estoqueRepository.findAll();
    }

    public boolean excluirProduto(String id) {
        try {
            ObjectId objectId = new ObjectId(id);
            if (estoqueRepository.existsById(objectId)) {
                estoqueRepository.deleteById(objectId);
                return true;
            }
            return false;
        } catch (IllegalArgumentException e) {
            // Log da exceção pode ser adicionado aqui, se necessário
            return false;
        }
    }
}
