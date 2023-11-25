// ListaProdutoService.java
package com.demeter.gestaoagro.service;

import com.demeter.gestaoagro.model.Estoque;
import com.demeter.gestaoagro.repository.EstoqueRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ListaProdutoService {

    private final EstoqueRepository estoqueRepository;

    public ListaProdutoService(EstoqueRepository estoqueRepository) {
        this.estoqueRepository = estoqueRepository;
    }

    public List<Estoque> listarTodosProdutos() {
        return estoqueRepository.findAll();
    }
}
