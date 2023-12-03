package com.demeter.gestaoagro.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.demeter.gestaoagro.model.Despesa;
import com.demeter.gestaoagro.service.DespesaService;

@RestController
@RequestMapping("/api/despesas")
public class DespesaController {

    private final DespesaService despesaService;

    @Autowired
    public DespesaController(DespesaService despesaService) {
        this.despesaService = despesaService;
    }

    // Método original para adicionar despesa via JSON
    @PostMapping
    public Despesa adicionarDespesaJson(@RequestBody Despesa despesa) {
        return despesaService.salvarDespesa(despesa);
    }
    
    // Método para adicionar despesa via multipart/form-data
    @PostMapping(path = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Despesa> adicionarDespesaMultipart(
            @RequestParam("dataDespesa") String dataDespesa,
            @RequestParam("valorDespesa") Double valorDespesa,
            @RequestParam("descricaoDespesa") String descricaoDespesa,
            @RequestParam("pago") Boolean pago,
            @RequestParam(value = "anexoDespesa", required = false) MultipartFile anexoDespesa) {
        
        Despesa despesa = new Despesa();
        despesa.setDataDespesa(dataDespesa);
        despesa.setValorDespesa(valorDespesa);
        despesa.setDescricaoDespesa(descricaoDespesa);
        despesa.setPago(pago);
        // Aqui você pode lidar com o anexo, se necessário.
        
        Despesa despesaSalva = despesaService.salvarDespesa(despesa);
        return ResponseEntity.ok(despesaSalva);
    }
}