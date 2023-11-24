package com.demeter.gestaoagro.controller;

import com.demeter.gestaoagro.model.CadastroCliente;
import com.demeter.gestaoagro.service.CadastroClienteService;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<?> addCadastroCliente(@RequestBody CadastroCliente cadastroCliente) {
        if (!cadastroCliente.isCnpjValido()) {
            return ResponseEntity.badRequest().body("CNPJ invalido");
        }

        if (cadastroClienteService.cnpjExiste(cadastroCliente.getCnpj())) {
            return ResponseEntity.badRequest().body("CNPJ ja cadastrado");
        }

        if (!cadastroCliente.isCpfValido()) {
            return ResponseEntity.badRequest().body("CPF invalido");
        }

        if (cadastroClienteService.cpfExiste(cadastroCliente.getCpf())) {
            return ResponseEntity.badRequest().body("CPF ja cadastrado");
        }

        return ResponseEntity.ok(cadastroClienteService.saveCadastroCliente(cadastroCliente));
    }

    @PostMapping("/addBatch")
    public ResponseEntity<?> addCadastroClientes(@RequestBody List<CadastroCliente> cadastroClientes) {
        for (CadastroCliente cliente : cadastroClientes) {
            if (!cliente.isCnpjValido()) {
                return ResponseEntity.badRequest().body("Um ou mais CNPJs inválidos na lista");
            }

            if (cadastroClienteService.cnpjExiste(cliente.getCnpj())) {
                return ResponseEntity.badRequest().body("Um ou mais CNPJs já cadastrados na lista");
            }

            if (!cliente.isCpfValido()) {
                return ResponseEntity.badRequest().body("Um ou mais CPFs inválidos na lista");
            }

            if (cadastroClienteService.cpfExiste(cliente.getCpf())) {
                return ResponseEntity.badRequest().body("Um ou mais CPFs já cadastrados na lista");
            }
        }

        return ResponseEntity.ok(cadastroClienteService.saveCadastroClientes(cadastroClientes));
    }

    // O método de listagem foi removido
}
