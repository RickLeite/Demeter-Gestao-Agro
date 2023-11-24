package com.demeter.gestaoagro.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.demeter.gestaoagro.model.Venda;
import com.demeter.gestaoagro.service.VendaService;
import com.demeter.gestaoagro.service.CadastroClienteService;

import java.util.List;

@RestController
@RequestMapping("/vendas")
public class VendaController {

    @Autowired
    private VendaService vendaService;

    @Autowired
    private CadastroClienteService cadastroClienteService;

    @PostMapping("/cadastrar")
    public ResponseEntity<String> cadastrarVenda(@RequestBody Venda venda) {
        try {
            // Verifica se o CNPJ existe antes de cadastrar a venda
            if (!cadastroClienteService.cnpjExiste(venda.getCnpj())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("CNPJ não encontrado. Cliente não cadastrado.");
            }

            vendaService.cadastrarVenda(venda);
            return ResponseEntity.ok("Venda cadastrada com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao cadastrar a venda.");
        }
    }

    @GetMapping("/por-cnpj/{cnpj}")
    public ResponseEntity<List<Venda>> obterVendasPorCnpj(@PathVariable String cnpj) {
        List<Venda> vendas = vendaService.obterVendasPorCnpj(cnpj);

        if (vendas.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(vendas);
    }

    @GetMapping("/todas")
    public ResponseEntity<List<Venda>> obterTodasAsVendas() {
        List<Venda> vendas = vendaService.obterTodasAsVendas();

        if (vendas.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(vendas);
    }
}
