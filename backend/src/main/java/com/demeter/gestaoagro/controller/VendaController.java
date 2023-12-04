package com.demeter.gestaoagro.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.demeter.gestaoagro.model.Venda;
import com.demeter.gestaoagro.service.CadastroClienteService;
import com.demeter.gestaoagro.service.VendaService;

import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "http://127.0.0.1:3000")
@RestController
@RequestMapping("/vendas")
public class VendaController {

    private final VendaService vendaService;
    private final CadastroClienteService cadastroClienteService;

    public VendaController(VendaService vendaService, CadastroClienteService cadastroClienteService) {
        this.vendaService = vendaService;
        this.cadastroClienteService = cadastroClienteService;
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<String> cadastrarVenda(@RequestBody Venda venda) {
        try {
            // Verifica se o CNPJ existe antes de cadastrar a venda.
            if (!cadastroClienteService.cnpjExiste(venda.getCnpj())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("CNPJ não encontrado. Cliente não cadastrado.");
            }

            // Certifique-se de que o código de venda foi gerado no front-end ou gere apenas uma vez aqui.
            if (venda.getCodigoVenda() == null || venda.getCodigoVenda().isEmpty()) {
                // Gera um código único para a venda
                String codigoVenda = UUID.randomUUID().toString();
                venda.setCodigoVenda(codigoVenda);
            }

            vendaService.cadastrarVenda(venda);
            return ResponseEntity.ok("Venda cadastrada com sucesso");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao cadastrar a venda.");
        }
    }

    @GetMapping("/por-cnpj/{cnpj}")
    public ResponseEntity<List<Venda>> obterVendasPorCnpj(@PathVariable String cnpj) {
        List<Venda> vendas = vendaService.listarVendasPorCnpj(cnpj);

        if (vendas.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(vendas);
    }

    @GetMapping("/todas")
    public ResponseEntity<List<Venda>> obterTodasAsVendas() {
        List<Venda> vendas = vendaService.listarTodasAsVendas();

        if (vendas.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(vendas);
    }
}
