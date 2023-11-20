package com.demeter.gestaoagro.controller;

import com.demeter.gestaoagro.model.CadastroCliente;
import com.demeter.gestaoagro.service.CadastroClienteService;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/cadastroCliente")
public class CadastroClienteController {

    private final CadastroClienteService cadastroClienteService;

    public CadastroClienteController(CadastroClienteService cadastroClienteService) {
        this.cadastroClienteService = cadastroClienteService;
    }

    @PostMapping("/add")
    public CadastroCliente addCadastroCliente(@RequestBody CadastroCliente cadastroCliente) {
        return cadastroClienteService.saveCadastroCliente(cadastroCliente);
    }

    @PostMapping("/addBatch")
    public List<CadastroCliente> addCadastroClientes(@RequestBody List<CadastroCliente> cadastroClientes) {
        return cadastroClienteService.saveCadastroClientes(cadastroClientes);
    }

    // Outros endpoints podem ser adicionados aqui conforme necessário
}
