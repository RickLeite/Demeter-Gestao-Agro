package com.demeter.gestaoagro.controller;

import com.demeter.gestaoagro.model.Registro;
import com.demeter.gestaoagro.service.RegistroService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/registro")
public class RegistroController {

    private final RegistroService registroService;

    public RegistroController(RegistroService registroService) {
        this.registroService = registroService;
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<String> cadastrarRegistro(@RequestBody Registro registro) {
        try {
            Registro novoRegistro = registroService.salvarRegistro(registro);
            return new ResponseEntity<>("Registro cadastrado com sucesso! ID: " + novoRegistro.getId(), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Erro ao cadastrar o registro: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/listar")
    public ResponseEntity<List<Registro>> listarRegistros() {
        List<Registro> registros = registroService.listarRegistros();
        return new ResponseEntity<>(registros, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Registro> obterRegistroPorId(@PathVariable String id) {
        Optional<Registro> registro = registroService.obterRegistroPorId(id);
        return registro.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> atualizarRegistro(@PathVariable String id, @RequestBody Registro novoRegistro) {
        try {
            Registro registroAtualizado = registroService.atualizarRegistro(id, novoRegistro);
            return new ResponseEntity<>("Registro atualizado com sucesso! ID: " + registroAtualizado.getId(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Erro ao atualizar o registro: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletarRegistro(@PathVariable String id) {
        try {
            registroService.deletarRegistro(id);
            return new ResponseEntity<>("Registro deletado com sucesso!!", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Erro ao deletar o registro: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}