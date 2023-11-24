package com.demeter.gestaoagro.service;

import org.springframework.stereotype.Service;
import com.demeter.gestaoagro.model.Venda;
import com.demeter.gestaoagro.repository.VendaRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Service
public class VendaService {
    @Autowired
    private VendaRepository vendaRepository;

    public void cadastrarVenda(Venda venda) {
        vendaRepository.save(venda);
    }

    public List<Venda> obterVendasPorCnpj(String cnpj) {
        return vendaRepository.findByCnpj(cnpj);
    }

    public List<Venda> obterTodasAsVendas() {
        return vendaRepository.findAll();
    }

    public boolean existeVendaComId(String vendaId) {
        return vendaRepository.existsById(vendaId);
    }
}
