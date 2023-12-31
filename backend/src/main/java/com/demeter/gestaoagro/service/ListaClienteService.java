package com.demeter.gestaoagro.service;

import com.demeter.gestaoagro.model.CadastroCliente;
import com.demeter.gestaoagro.repository.CadastroClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ListaClienteService {

    private final CadastroClienteRepository cadastroClienteRepository;

    @Autowired
    public ListaClienteService(CadastroClienteRepository cadastroClienteRepository) {
        this.cadastroClienteRepository = cadastroClienteRepository;
    }

    public List<CadastroCliente> listarTodos() {
        return cadastroClienteRepository.findAll();
    }

    public List<CadastroCliente> buscarPorNome(String nome) {
        // Método atualizado para usar a busca por correspondência parcial
        return cadastroClienteRepository.findByNomeLike(nome);
    }

    public void deleteCliente(String id) {
        cadastroClienteRepository.deleteById(id);
    }
}
