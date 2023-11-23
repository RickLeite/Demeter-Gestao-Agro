package com.demeter.gestaoagro.service;

import com.demeter.gestaoagro.model.CadastroCliente;
import com.demeter.gestaoagro.repository.CadastroClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CadastroClienteService {

    private final CadastroClienteRepository cadastroClienteRepository;

    @Autowired
    public CadastroClienteService(CadastroClienteRepository cadastroClienteRepository) {
        this.cadastroClienteRepository = cadastroClienteRepository;
    }

    public CadastroCliente saveCadastroCliente(CadastroCliente cadastroCliente) {
        return cadastroClienteRepository.save(cadastroCliente);
    }

    public List<CadastroCliente> saveCadastroClientes(List<CadastroCliente> cadastroClientes) {
        return cadastroClienteRepository.saveAll(cadastroClientes);
    }

    public List<CadastroCliente> findAll() {
        return cadastroClienteRepository.findAll();
    }

    // Outros métodos, como busca por ID, atualização e exclusão, podem ser adicionados aqui.
}
