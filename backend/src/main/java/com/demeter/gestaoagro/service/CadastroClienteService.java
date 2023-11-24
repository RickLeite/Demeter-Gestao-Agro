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

    // O método findAll foi removido.

    public boolean cnpjExiste(String cnpj) {
        return cadastroClienteRepository.findByCnpj(cnpj).isPresent();
    }

    public boolean cpfExiste(String cpf) {
        return cadastroClienteRepository.findByCpf(cpf).isPresent();
    }
}
