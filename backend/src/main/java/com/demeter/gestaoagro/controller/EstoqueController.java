package com.demeter.gestaoagro.controller;
import com.demeter.gestaoagro.service.EstoqueService;
import com.demeter.gestaoagro.model.Estoque;
import org.bson.types.ObjectId;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/estoque")
public class EstoqueController {

    private final EstoqueService estoqueService;

    public EstoqueController(EstoqueService estoqueService) {
        this.estoqueService = estoqueService;
    }

    @GetMapping("/all")
    public List<Estoque> getAllEstoque() {
        return estoqueService.getAllEstoque();
    }

    @PostMapping("/add")
    public ResponseEntity<Estoque> addEstoque(@RequestBody Estoque estoque) {
        Estoque savedEstoque = estoqueService.saveEstoque(estoque);
        return ResponseEntity.ok(savedEstoque);
    }

    @PostMapping("/addBatch")
    public List<Estoque> addEstoques(@RequestBody List<Estoque> estoques) {
        return estoqueService.saveEstoques(estoques);
    }

    @DeleteMapping("/removeLast")
    public ResponseEntity<String> removeLastEstoque() {
        Estoque lastEstoque = estoqueService.getLastAddedEstoque();

        if (lastEstoque != null) {
            ObjectId lastEstoqueId = lastEstoque.id;
            estoqueService.removeEstoque(lastEstoqueId);
            return new ResponseEntity<>("Removed last Estoque with ID: " + lastEstoqueId, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("No Estoque items to remove", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/remove/{id}")
    public ResponseEntity<String> removeEstoqueById(@PathVariable String id) {
        try {
            ObjectId objectId = new ObjectId(id);
            estoqueService.removeEstoque(objectId);
            return new ResponseEntity<>("Removed Estoque with ID: " + id, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>("Invalid ObjectId format for ID: " + id, HttpStatus.BAD_REQUEST);
        } catch (EmptyResultDataAccessException e) {
            return new ResponseEntity<>("No Estoque item found with ID: " + id, HttpStatus.NOT_FOUND);
        }
    }


}
