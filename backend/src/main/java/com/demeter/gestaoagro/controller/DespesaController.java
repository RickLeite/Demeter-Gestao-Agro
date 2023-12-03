package com.demeter.gestaoagro.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.Base64;
import org.springframework.http.HttpStatus;
import java.io.IOException;
import java.io.FileOutputStream; // Adicione esta importação

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

    @PostMapping
    public Despesa adicionarDespesaJson(@RequestBody Despesa despesa) {
        return despesaService.salvarDespesa(despesa);
    }

    @PostMapping(path = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Despesa> adicionarDespesaMultipart(
            @RequestParam("dataDespesa") String dataDespesa,
            @RequestParam("valorDespesa") Double valorDespesa,
            @RequestParam("descricaoDespesa") String descricaoDespesa,
            @RequestParam("pago") Boolean pago,
            @RequestParam("nomeDoArquivo") String nomeDoArquivo,
            @RequestParam(value = "anexoDespesa", required = false) MultipartFile anexoDespesa) {
        
        Despesa despesa = new Despesa();
        despesa.setDataDespesa(dataDespesa);
        despesa.setValorDespesa(valorDespesa);
        despesa.setDescricaoDespesa(descricaoDespesa);
        despesa.setPago(pago);

        if (anexoDespesa != null && !anexoDespesa.isEmpty()) {
            try {
                byte[] bytes = anexoDespesa.getBytes();
                String base64Encoded = Base64.getEncoder().encodeToString(bytes);
                despesa.setAnexo(base64Encoded);
                
                // Salva o arquivo decodificado com o nome original
                FileOutputStream fos = new FileOutputStream(nomeDoArquivo);
                fos.write(bytes);
                fos.close();
            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }
        
        Despesa despesaSalva = despesaService.salvarDespesa(despesa);
        return ResponseEntity.ok(despesaSalva);
    }
}