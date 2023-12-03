package com.demeter.gestaoagro.service;

import com.demeter.gestaoagro.model.Despesa;
import com.demeter.gestaoagro.repository.DespesaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DespesaService {

    private final DespesaRepository despesaRepository;

    @Autowired
    public DespesaService(DespesaRepository despesaRepository) {
        this.despesaRepository = despesaRepository;
    }

    public Despesa salvarDespesa(Despesa despesa) {
        return despesaRepository.save(despesa);
    }

    public List<Despesa> listarTodasDespesas() {
        return despesaRepository.findAll();
    }

    public Optional<Despesa> buscarDespesaPorId(String id) {
        return despesaRepository.findById(id);
    }

    public void excluirDespesa(String id) {
        despesaRepository.deleteById(id);
    }
}