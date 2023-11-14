package com.demeter.gestaoagro.service;

import com.demeter.gestaoagro.model.CadastroCliente;
import com.demeter.gestaoagro.repository.CadastroClienteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CadastroClienteService {

    private final CadastroClienteRepository cadastroClienteRepository;

    public CadastroClienteService(CadastroClienteRepository cadastroClienteRepository) {
        this.cadastroClienteRepository = cadastroClienteRepository;
    }

    public CadastroCliente saveCadastroCliente(CadastroCliente cadastroCliente) {
        return cadastroClienteRepository.save(cadastroCliente);
    }

    public List<CadastroCliente> saveCadastroClientes(List<CadastroCliente> cadastroClientes) {
        return cadastroClienteRepository.saveAll(cadastroClientes);
    }

    // Aqui você pode adicionar outros métodos de serviço que são específicos para a entidade CadastroCliente
    // Por exemplo, buscar um cliente pelo CPF
    public CadastroCliente findCadastroClienteByCpf(String cpf) {
        return cadastroClienteRepository.findByCpf(cpf);
    }

    // E outros métodos conforme a necessidade de negócio
}
