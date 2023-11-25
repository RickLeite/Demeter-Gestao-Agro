package com.demeter.gestaoagro.controller;

import com.demeter.gestaoagro.model.Estoque;
import com.demeter.gestaoagro.service.ListaProdutoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produtos")
public class ListaProdutoController {

    private final ListaProdutoService listaProdutoService;

    public ListaProdutoController(ListaProdutoService listaProdutoService) {
        this.listaProdutoService = listaProdutoService;
    }

    @GetMapping
    public List<Estoque> listarTodosProdutos() {
        return listaProdutoService.listarTodosProdutos();
    }
}

