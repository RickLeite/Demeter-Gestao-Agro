package com.demeter.gestaoagro.controller;

import com.demeter.gestaoagro.model.CadastroCliente;
import com.demeter.gestaoagro.service.ListaClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clientes")
public class ListaClienteController {

    private final ListaClienteService listaClienteService;

    @Autowired
    public ListaClienteController(ListaClienteService listaClienteService) {
        this.listaClienteService = listaClienteService;
    }

    @GetMapping("/lista")
    public List<CadastroCliente> listarTodosOsClientes() {
        return listaClienteService.listarTodos();
    }

    @GetMapping("/pesquisa")
    public ResponseEntity<List<CadastroCliente>> buscarPorNome(@RequestParam String nome) {
        return ResponseEntity.ok(listaClienteService.buscarPorNome(nome));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCliente(@PathVariable String id) {
        listaClienteService.deleteCliente(id);
        return ResponseEntity.ok().build();
    }
}
