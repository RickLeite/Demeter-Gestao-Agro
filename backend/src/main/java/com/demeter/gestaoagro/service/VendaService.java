package com.demeter.gestaoagro.service;

import com.demeter.gestaoagro.model.Venda;
import com.demeter.gestaoagro.repository.VendaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VendaService {

    private final VendaRepository vendaRepository;

    public VendaService(VendaRepository vendaRepository) {
        this.vendaRepository = vendaRepository;
    }

    public Optional<Venda> cadastrarVenda(Venda venda) {
        return Optional.of(vendaRepository.save(venda));
    }

    public List<Venda> listarVendasPorCnpj(String cnpj) {
        return vendaRepository.findByCnpj(cnpj);
    }

    public List<Venda> listarTodasAsVendas() {
        return vendaRepository.findAll();
    }
}
