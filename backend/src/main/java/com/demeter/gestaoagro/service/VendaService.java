package com.demeter.gestaoagro.service;

import org.springframework.stereotype.Service;
import com.demeter.gestaoagro.model.Venda;
import org.springframework.beans.factory.annotation.Autowired;
import com.demeter.gestaoagro.repository.VendaRepository;

@Service
public class VendaService {
    @Autowired
    private VendaRepository vendaRepository;

    public void cadastrarVenda(Venda venda) {
        vendaRepository.save(venda);
    }
}
